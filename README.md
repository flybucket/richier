### To prepare site for production
If you change any part of the styling in or javascript in the `/src` directory, you need to recompile/minify them into their respective folders.
##### Compile SCSS
Used Sass 3.4.23 (Selective Steve), but any newer version would do.

```sass --watch src/styles.scss:css/styles.css --style compressed```

##### Minify JS
Using https://github.com/mishoo/UglifyJS2

```uglifyjs -c -m -o js/index.min.js src/index.js```

---
##### To add a new video
1. Save the background of the video section (see `/assets/EFFECT.chip.jpg` for example) into the `/assets` directory.
2. In `index.html`, scroll to the bottom of the page and look for a `<div>` tag with the class: `video__wrapper`. Copy the entire block and paste it where you want it. Note: Each video__wrapper div is one of the video sections.
3. Change the `<img class="video__thumbnail">` tag source with the name of the file you saved in step (1).
4. Change the name of the company in `<h4 class="video__thumbnail-company">`
5. Change the title of the video in `<h1 class="video__thumbnail-title">`
6. (Important!) Think of a unique video id name and input that in `<button id="unique_video_id" class="video__thumbnail-btn">` where unique_video_id is replaced with your input.
7. In `/src/index.js` line 27, you should see an object called `videos`. Insert your video id name (taken from step #6) somewhere in the object (anywhere in the object is fine [I like to keep it alphabetical]). Remember the comma at the end of the line (unless it's the last line)!
8. Minify your javascript file (see top of readme). This should put a new compiled file into `/js/index.min.js`
9. (optional) If you have live-server (https://www.npmjs.com/package/live-server), you can preview your page before you upload it.
10. Upload changed files into your S3 bucket, namely the background image in `/assets`, the `index.html` file, and the `/js/index.min.js` file.

##### To save changes
1. `git add -p` to review each change or `git add .` to add everything that changed (plus new files)
2. `git commit -m 'new commit'` to commit the changes
3. `git push -u origin master` to push the changes to a remote server (in this case, master)
