HTML5 Banner Gulp Task Runner
=============

A gulp task runner that is meant to run in a separate folder away from your banner src directory. The task runner helps with:

0. Browser Live Reload and CSS injection
0. SASS compiling
0. JSLinting
0. Various delivery/packaging related tasks such as removing devdelopment related files and zipping for delivery. 


Installation
-----------
Clone repo and run `npm install`


Usage
-----
Update vars `currentProjectPath` and `browserSyncPath`.

`currentProjectPath` is the root folder of your banner campaign.  This path is used for packaging related tasks.
`browserSyncPath` is the path to the current banner size that you wish to work on.  Later on if you need to switch to another size you will need to update that variable and restart the gulp task runner.  This is the path that live reloads.

To start development tasks

```js
gulp
or
gulp development
```

Build banner files for delivery

```js
gulp build
```

Misc tasks

```js
gulp clean
```
Removes `_delivery` and `_dist` directories.
