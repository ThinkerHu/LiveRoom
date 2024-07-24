package com.bvc.network

import com.bvc.common.tools.copyTo2
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.Request
import java.io.File

sealed class DownloadStatus {
    data class Progress(val progress: Int) : DownloadStatus()
    data class Error(val t: Throwable) : DownloadStatus()
    data class Done(val file: File) : DownloadStatus()
}

object DownloadManager {

    suspend fun downloadFile(url: String, file: File, listener: (DownloadStatus) -> Unit) =
        withContext(Dispatchers.IO) {
            val httpClient = HttpManager.instance().initHttpClient()
            val request = Request.Builder().url(url).get().build()
            try {
                httpClient?.newCall(request)?.execute()?.apply {
                    if (isSuccessful) {
                        body.let { body ->
                            val totalLength = body.contentLength().toDouble()
                            file.outputStream().run {
                                val input = body.byteStream()
                                input.copyTo2(this) { currentLength ->
                                    val process = currentLength / totalLength * 100
                                    withContext(Dispatchers.Main) {
                                        listener(DownloadStatus.Progress(process.toInt()))
                                    }
                                }
                            }
                            listener(DownloadStatus.Done(file))
                        }
                    } else {
                        file.delete()
                        listener(DownloadStatus.Done(file))
                    }
                }
            } catch (e: Exception) {
                listener(DownloadStatus.Error(e.fillInStackTrace()))
            }
        }
}