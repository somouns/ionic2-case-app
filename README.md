# ionic2-case-app
基于angular2+ionic2的一个电子商务类型的app

技术栈

·HTML/CSS/JS：亘古不变三件套
·ES6：ECMAScript 新一代语法，这也是以后的趋势
·ionic2
·Typescript
·Angular2

Build Setup

(1)下载 Node.js（傻瓜式安装，没特别说明的），安装完成(cmd命令行输入node –version出现版本号表示配置node成功),配置JDK，Android SDK(具体请看上面的环境配置) 
(2)安装淘宝镜像(为了解决网络环境的问题)
    npm install -g cnpm --regidtry=https://registry.npm.taobao.org
(3)安装ionic
    npm install -g ionic
(4)安装 Cordova
    npm install -g cordova
(5)查看ionic版本
    ionic –v
(6)查看cordova版本
    cordova –v
(7)展现ionic项目结果（显示在iOS和Android上的样式）
    ionic serve (在浏览器中显示效果,chrome调试)
(8)添加android/ios平台
    ionic platform add android/ios（添加android平台/ios）
(9)生成android／ipa安装包(生成后apk／ipa的存放路径在终端种可以看到)
    ionic build android/ios
    ionic build android –prod –device 中的 –prod 表示启用aot；–device 将要求略过白屏启动时间
    ionic build andorid --release，生成的apk就是release发布版本
    在项目platforms\android\build\outputs\android-debug.apk生成调试安装包
(10)使用设备运行应用，如果无设备可用将自动使用模拟器
    ionic run android/ios
