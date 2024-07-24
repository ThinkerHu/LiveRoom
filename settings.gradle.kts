pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "LiveRoom"
include(":app")

include(":Libs:UI")
include(":Libs:NetWork")
include(":Libs:Tools")
include(":Libs:Game")
