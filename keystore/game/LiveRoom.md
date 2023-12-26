keytool -genkey -alias KingTrade  -keyalg RSA -keysize 2048 -validity 36500 -keystore KingTrade.keystore
您的名字与姓氏是什么?
[Unknown]:  KingTrade
您的组织单位名称是什么?
[Unknown]:  KingTrade
您的组织名称是什么?
[Unknown]:  KingTrade
您所在的城市或区域名称是什么?
[Unknown]:  Singapore
您所在的省/市/自治区名称是什么?
[Unknown]:  Singapore
该单位的双字母国家/地区代码是什么?
[Unknown]:  65
CN=fi, OU=fi, O=fi, L=Singapore, ST=Singapore, C=65是否正确?



### google play keystore

```
    storeFile file("${rootDir}/keystore/release/KingTrade.keystore")
    storePassword "2023makemoney"
    keyAlias "KingTrade"
    keyPassword "2023makemoney"
```

```
密钥库类型: JKS
密钥库提供方: SUN

您的密钥库包含 1 个条目

别名: kingtrade
创建日期: 2023-4-28
条目类型: PrivateKeyEntry
证书链长度: 1
证书[1]:
所有者: CN=KingTrade, OU=KingTrade, O=KingTrade, L=Singapore, ST=Singapore, C=65
发布者: CN=KingTrade, OU=KingTrade, O=KingTrade, L=Singapore, ST=Singapore, C=65
序列号: 2c912ada
有效期开始日期: Fri Apr 28 16:58:23 CST 2023, 截止日期: Sun Apr 04 16:58:23 CST 2123
证书指纹:
	 MD5: 1D:B7:30:64:0C:FC:13:F4:D5:D6:6C:B3:96:26:F9:BD
	 SHA1: D2:A2:3D:77:88:C4:A4:70:DE:AA:05:1C:12:B0:3E:1B:87:61:99:1B
	 SHA256: 27:09:14:D6:74:B2:49:0B:3C:E0:E5:F7:E7:93:8F:7F:90:35:96:D7:D1:7F:B9:6A:A9:5C:A3:D5:14:35:F9:2F
	 签名算法名称: SHA256withRSA
	 版本: 3

扩展:

#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 47 FF E0 69 46 6D E5 7A   C1 21 88 1C 9D FD CD 38  G..iFm.z.!.....8
0010: 5D E5 E5 5B                                        ]..[
]
]


*******************************************
*******************************************



```