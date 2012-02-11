coffee -o src\js -c src\coffee\namespaces.coffee

$models = [string]::join(" ",(gci src\coffee\models\*.coffee | foreach { $_.fullname}))
Invoke-Expression("coffee -j src\js\models.js -c {0}" -f $models)

$collections = [string]::join(" ",(gci src\coffee\collections\*.coffee | foreach { $_.fullname}))
Invoke-Expression("coffee -j src\js\collections.js -c {0}" -f $collections)

if( [IO.Directory]::Exists("src\coffee\views") ) {
  $views = [string]::join(" ",(gci src\coffee\views\*.coffee | foreach {$_.fullname}))
  Invoke-Expression("coffee -j src\js\views.js -c {0}" -f $views)
}

Get-Content src\js\namespaces.js > overflow.js
Get-Content src\js\models.js >> overflow.js

Get-Content src\js\collections.js >> overflow.js

Get-Content vendor\js\jquery-1.7.1.js > vendor.js
Get-Content vendor\js\json2.js >> vendor.js
Get-Content vendor\js\underscore.js >> vendor.js
Get-Content vendor\js\backbone.js >> vendor.js
Get-Content vendor\js\backbone.localstorage.js >> vendor.js

