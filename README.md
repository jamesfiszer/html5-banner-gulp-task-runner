HTML5 Banner Gulp Task Runner
=============

A gulp system designed for HTML5 banner development.  This is meant to run in a separate directory away from your banner source directory. The gulp system helps with:

0. Live browser reload
0. SASS compiling
0. JSLinting
0. Various delivery/packaging tasks such as removing scss files and zipping each banner folder for delivery. 


Installation
-----------
Clone repo and run `npm install`


Usage
-----
Update vars `currentProjectPath` and `browserSyncPath`.

`currentProjectPath` is the root folder of your banner campaign. `browserSyncPath` is the path to the current banner that you wish to work on.  Later when you need to switch to another banner size stop the task runner and update the `browserSyncPath` and run `gulp` again to start live browser reload on the new size.

To start live browser reload

```js
gulp
or
gulp development
```

Build banner files for delivery

```js
gulp build
```

Clean build files - Removes `_delivery` and `_dist` directories

```js
gulp clean
```

