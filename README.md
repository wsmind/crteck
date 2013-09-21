CRTeCK
======

WebGL 8k intro (6.2k actually, there was some space left ^^)

Released at DemoJS 2013, ranked 2nd place in 8k compo.

Made with tons of love and GLSL by titeiko, did' and wsmind.

Watch it here: [final version](http://wsmind.github.io/crteck/release-final/crteck-final.html), [party version](http://wsmind.github.io/crteck/release/crteck.html)

[Pouet link](http://www.pouet.net/prod.php?which=61510)

License
-------

All the code (javascript or shader) you can find in this repository is licensed under the MIT license, with the exception of the SoundBox player, wich was written
by Marcus Geelnard (see js/player.js for details).

Music was done by wsmind, please ask permission before using it for something else.

Other tools and middleware used in this intro:
 * [JsExe from cb/adinpsz](http://www.pouet.net/prod.php?which=59298)
 * [NodeJS](http://nodejs.org/)
 * [GLSL-Unit](http://code.google.com/p/glsl-unit/)
 * [line-reader](https://github.com/nickewing/line-reader)
 * [rimraf](https://github.com/isaacs/rimraf/)
 * [ShaderToy](https://www.shadertoy.com/), for shader prototyping

Build (windows-only)
--------------------

### Side note: this is Javascript, why are you even building this?

This is good question, normal JS programs don't require building. What we use building for:
 * Compiling assets (shaders and meshes) directly into JS code. The goal of this is twofold:
   * Avoid dynamically loading these data at runtime, they are directly built into the source code. This is not required for a typical
     application, but is quite practical for an intro (actually, any external request is usually stricly forbidden by party rules).
   * Building assets allows complex optimization to be done at this step. For CRTeCK, we only minified shaders (there are no meshes). Note
     that as shaders are represented as strings in JS, they wouldn't be minified by a standard tool (e.g Closure Compiler), so they
	 need a separate minification step.
 * Concatenating and minifying/compressing the whole source code. This allows:
   * To fit in small sizes (the exact steps are minification through Closure Compiler, and PNG compression with JsExe)
   * Protecting the source code, but we don't really mind (open source is cool :p)
   * A cleaner distribution package, with only a few files, not a big folder full of .js classes.

### Environment

You need installed:
 * NodeJS >= 0.8.x
 * NPM

### Steps (unpacked build, fast)

Run in a command prompt:
```sh
npm install
build
```

Then you should be able to run build/unpacked.html.

### Steps (packed build, slow but very small)

Run in a command prompt:
```sh
npm install
build --pack
```

Then you should be able to run build/packed.html (which, by the way, should be very small, like something around 6kB).
