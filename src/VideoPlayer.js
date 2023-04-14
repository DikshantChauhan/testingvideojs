import React, { useRef, useState, useEffect } from "react";

import videojs from "video.js";
import "videojs-contextmenu-ui";
import "videojs-overlay";
import "videojs-annotations";
import AnnotationComments from "@contently/videojs-annotation-comments";
import "@contently/videojs-annotation-comments/build/css/annotations.css";
videojs.registerPlugin("annotationComments", AnnotationComments(videojs));

export const VideoPlayer = (props) => {
  const videoPlayerRef = useRef(null); // Instead of ID
  const [currentTime, setCurrentTime] = useState(null);
  const videoSrc = "https://ix-shop.imgix.video/Croatia.mp4?fm=hls";
  // const videoSrc = "https://jdawson.imgix.net/blinkfinalbg.mp4?fm=hls";
  const videoJSOptions = {
    type: "application/x-mpegURL",
    autoplay: "muted",
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2]
  };

  useEffect(() => {
    if (videoPlayerRef) {
      console.log("videoPlayerRef is hit");
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src({ src: videoSrc, type: videoJSOptions.type });
        console.log(`videoSrc is : ` + videoSrc);
        player.on("ended", () => {
          console.log("ended");
        });
        player.on("timeupdate", () => {
          setCurrentTime(player.currentTime());
        });
        console.log("Player Ready");
      });

      const exampleLink = "Click this to see the example link";

      // const overlay_content = `<div id="overlaycss"><a href="https://imgix.com/" target="_blank"><img alt="Qries"
      // src="https://jdawson.imgix.net/Overlay_Button.png?w=250"</a></div>`;

      // player.overlay({
      //   overlays: [
      //     {
      //       // This overlay will appear when a video is playing and disappear when
      //       // the player is paused.
      //       content: overlay_content,
      //       class: "overlaycss",
      //       start: 1,
      //       end: 10,
      //       showBackground: true,
      //       align: "middle"
      //     },
      //     {
      //       // This overlay will appear when the "custom1" event is triggered and
      //       // disappear when the "custom2" event is triggered.
      //       start: "click",
      //       end: "click",
      //       content: "This is the content when it pauses"
      //     }
      //   ]
      // });
      // player.annotations();
      const annotationsObjects = [
        {
          id: 1,
          range: {
            start: 10,
            end: 15
          },
          shape: {
            x1: 23.47,
            y1: 9.88,
            x2: 60.83,
            y2: 44.2
          },
          comments: [
            {
              id: 1,
              meta: {
                datetime: "2017-03-28T19:17:32.238Z",
                user_id: 1,
                user_name: "Jack Pope"
              },
              body: "The first comment!"
            }
          ]
        }
      ];
      const pluginOptions = {
        // Collection of annotation data to initialize
        annotationsObjects: annotationsObjects,
        // Flexible meta data object (currently used for user data, but addl data can be provided to wrap each comment with metadata - provide the id of the current user and fullname of the current user at minimum, which are required for the UI)
        meta: { user_id: null, user_name: null },
        // Use arrow keys to move through annotations when Annotation mode is active
        bindArrowKeys: true,
        // Show or hide the control panel and annotation toggle button (NOTE - if controls are hidden you must provide custom UI and events to drive the annotations - more on that in "Programmatic Control" below)
        showControls: true,
        // Show or hide the comment list when an annotation is active. If false, the text 'Click and drag to select', will follow the cursor during annotation mode
        showCommentList: true,
        // If false, annotations mode will be disabled in fullscreen
        showFullScreen: true,
        // Show or hide the tooltips with comment preview, and annotation shape, on marker hover or timeline activate
        showMarkerShapeAndTooltips: true,
        // If false, step two of adding annotations (writing and saving the comment) will be disabled
        internalCommenting: true,
        // If true, toggle the player to annotation mode immediately after init. (NOTE - "annotationModeEnabled" event is not fired for this initial state)
        startInAnnotationMode: false
      };
      var plugin = player.annotationComments(pluginOptions);
      plugin.onReady(() => {
        // alert(1);
        setTimeout(() => {
          plugin.fire("addingAnnotation");
        }, 2000);
      });
      plugin.registerListener("onStateChanged", (event) => {
        console.log("event.detail", event.detail);
      });
    }

    return () => {};
  }, []);

  return (
    <div>
      <div style={{ height: "500px", width: "500px" }}>
        <div id="overlay">The videojs version of an overlay</div>
        <video
          //type="application/x-mpegURL"
          style={{ width: "500px", height: "500px" }}
          ref={videoPlayerRef}
          className="video-js"
          //poster="https://image.media.imgix.video/02wBXRA6PpXwgqZdwXbIGgP00Ggj2hdbyd/thumbnail.jpg?width=800"
        />
        <span>Current Time: {currentTime}</span>
      </div>
      <br />
      <br />
      <section class="content">
        <article>
          <h2>Video overlay with imgix</h2>
          <p>
            Use this example to see how you can add overlays to your imgix
            videos. The overlay will appear at the 1 second mark and will end
            after the 10 second mark.
          </p>
        </article>
      </section>
      <div className="button-group">
        <a href="https://www.imgix.com/" className="button">
          Learn More about imgix
        </a>
      </div>
      <div className="button-group">
        <a href="https://github.com/imgix/vue" className="button">
          See Docs
        </a>
      </div>
    </div>
  );
};

{
  /* const overlay_content =
        '<div><img src="https://ix-shop.imgix.net/ix-logo.png" /> <a href="https://imgix.com/" target="_blank">' +
        exampleLink +
        "</a></div>" */
}
