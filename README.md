# ionic2-case-app<br>
基于angular2+ionic2的一个电子商务类型的app<br>

技术栈<br>

·HTML/CSS/JS：亘古不变三件套<br>
·ES6：ECMAScript 新一代语法，这也是以后的趋势<br>
·ionic2<br>
·Typescript<br>
·Angular2<br>

Build Setup<br>

(1)下载 Node.js（傻瓜式安装，没特别说明的），安装完成(cmd命令行输入node –version出现版本号表示配置node成功),配置JDK，Android SDK(具体请看上面的环境配置) <br>
(2)安装淘宝镜像(为了解决网络环境的问题)<br>
    npm install -g cnpm --regidtry=https://registry.npm.taobao.org<br>
(3)安装ionic<br>
    npm install -g ionic<br>
(4)安装 Cordova<br>
    npm install -g cordova<br>
(5)查看ionic版本<br>
    ionic –v<br>
(6)查看cordova版本<br>
    cordova –v<br>
(7)展现ionic项目结果（显示在iOS和Android上的样式）<br>
    ionic serve (在浏览器中显示效果,chrome调试)<br>
(8)添加android/ios平台<br>
    ionic platform add android/ios（添加android平台/ios）<br>
(9)生成android／ipa安装包(生成后apk／ipa的存放路径在终端种可以看到)<br>
    ionic build android/ios<br>
    ionic build android –prod –device 中的 –prod 表示启用aot；–device 将要求略过白屏启动时间<br>
    ionic build andorid --release，生成的apk就是release发布版本<br>
    在项目platforms\android\build\outputs\android-debug.apk生成调试安装包<br>
(10)使用设备运行应用，如果无设备可用将自动使用模拟器<br>
    ionic run android/ios<br>
