coffee -o src\js -c src\coffee\namespaces.coffee
Get-Content src\js\namespaces.js > overflow.js
Get-Content src\js\initialize.js >> overflow.js

echo '$(document).ready( function() {' >> overflow.js

$models = [string]::join(" ",(gci src\coffee\models\*.coffee | foreach { $_.fullname}))
Invoke-Expression("coffee -j src\js\models.js -c {0}" -f $models)
Get-Content src\js\models.js >> overflow.js

if( [IO.Directory]::Exists("c:\development\node\nodeoverflow\client\src\coffee\collections") ) {
  $collections = [string]::join(" ",(gci src\coffee\collections\*.coffee | foreach { $_.fullname}))
  Invoke-Expression("coffee -j src\js\collections.js -c {0}" -f $collections)
  Get-Content src\js\collections.js >> overflow.js
}
  
if( [IO.Directory]::Exists("c:\development\node\nodeoverflow\client\src\coffee\views") ) {
  $views = [string]::join(" ",(gci src\coffee\views\*.coffee | foreach {$_.fullname}))
  Invoke-Expression("coffee -j src\js\views.js -c {0}" -f $views)
  Get-Content src\js\views.js >> overflow.js
}

if( [IO.Directory]::Exists("c:\development\node\nodeoverflow\client\src\coffee\routers") ) {
  $routers = [string]::join(" ",(gci src\coffee\routers\*.coffee | foreach {$_.fullname}))
  Invoke-Expression("coffee -j src\js\routers.js -c {0}" -f $routers)
  Get-Content src\js\routers.js >> overflow.js
}

echo ' }); ' >> overflow.js

Get-Content vendor\js\jquery-1.7.1.js > vendor.js
Get-Content vendor\js\json2.js >> vendor.js
Get-Content vendor\js\underscore.js >> vendor.js
Get-Content vendor\js\backbone.js >> vendor.js
Get-Content vendor\js\backbone.iosync.js >> vendor.js

cp .\index.html ..\server\nodeoverflow_demo\nodeworker\public
cp .\overflow.js ..\server\nodeoverflow_demo\nodeworker\public
cp .\vendor.js ..\server\nodeoverflow_demo\nodeworker\public