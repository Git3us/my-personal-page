@echo off
echo Setting JAVA_HOME environment variable...

REM Set JAVA_HOME to JDK 17
setx JAVA_HOME "C:\Program Files\Java\jdk-17.0.18"

REM Add Java bin directory to PATH
setx PATH "%PATH%;%JAVA_HOME%\bin"

echo JAVA_HOME has been set to: C:\Program Files\Java\jdk-17.0.18
echo Please restart your command prompt for changes to take effect
pause