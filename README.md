### To prepare site for production
##### Compile SCSS
Using Sass 3.4.23 (Selective Steve)

```sass --watch src/styles.scss:css/styles.css --style compressed```

##### Minify JS
Using https://github.com/mishoo/UglifyJS2

```uglifyjs -c -m -o js/index.min.js src/index.js```
