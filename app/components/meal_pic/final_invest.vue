<template>
  <Page>
    <ActionBar title="Meal reporting application" class="menu-bar">
      <GridLayout columns="auto, *">
        <Label text="Meal reporting application" col="0" class="el1"/>
        <Image
          src="~/assets/images/icon_user.png"
          width="18"
          height="18"
          class="icon-left"
          @tap="$refs.drawer.nativeView.showDrawer()"
        />
      </GridLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer" drawerContentSize="160" drawerLocation="Right">
      <StackLayout ~drawerContent backgroundColor="#ffffff" class="drawer-placer">
        <!-- <Label class="drawer-header" text="Drawer"/> -->

        <Label class="drawer-item" text="Notifications"/>
        <Label class="drawer-item" text="Logout"/>
      </StackLayout>
      <StackLayout ~mainContent>
        <FlexboxLayout class="meal_image_container">
          <Image id="img1" src="~/assets/images/icon_camera.png" @tap="takePicture"/>
          <Image
            id="img2"
            v-if="this.$store.getters.imageRecuperee"
            v-model=" images"
            :src="images.src"
            @tap="deletePicture"
          />
          <Image
            id="img2"
            v-if="!this.$store.getters.imageRecuperee"
            src="~/assets/images/icon_meal.png"
            width="50%"
          />
          <Image id="img3" src="~/assets/images/icon_image.png" @tap="selectPicture"/>
        </FlexboxLayout>
        <StackLayout>
          <WrapLayout
            orientation="horizontal"
            width="100%"
            height="10"
            style="margin-top:20"
            backgroundColor="white"
          >
            <Label text width="100%" height="3" backgroundColor="black"/>
          </WrapLayout>
          <Label text="My meal contains" class="ann_police"/>
        </StackLayout>
        <RadListView
          ref="listView"
          for="option in options"
          orientation="vertical"
          height="40%"
          selectionBehavior="Press"
          multipleSelection="true"
          @itemTap="onItemTap"
          @itemDeselected="deselection"
          class="questionnaire-style"
        >
          <!-- @itemTap="onItemTap"-->
          <v-template>
            <StackLayout class="condition-elements-ingredients" :key="option.id">
              <!-- Shows the list item label in the default color and style. -->
              <Label clas="el" :text="option.name" textWrap="true" style="margin-top: 20"/>
              <!-- <Switch v-model="question.bool" /> -->
            </StackLayout>
          </v-template>
        </RadListView>
        <FlexBoxLayout flexDirection="row" justifyContent="center" class="full-height">
          <Image
            src="~/assets/images/icon_regress.png"
            width="50"
            height="50"
            class="icon-margin"
            @tap="goBack"
          />
          <Image
            src="~/assets/images/icon_progress.png"
            width="50"
            height="50"
            class="icon-margin"
            @tap="submit"
          />
        </FlexBoxLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import * as camera from "nativescript-camera";
import * as imagepicker from "nativescript-imagepicker";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Image } from "tns-core-modules/ui/image";
import newMeal from "../MealSubmission/NewM";

import questions2 from "../NowMeal/Questions2";
//import {Folder} from "tns-core-modules/file-system"
export default {
  data() {
    return {
      images: [],
      options: new ObservableArray([
        { id: 1, name: "flour", accronym: "Flour" },
        { id: 2, name: "wheat", accronym: "Wheat" },
        { id: 3, name: "tofu", accronym: "Tofu" },
        { id: 4, name: "gluten", accronym: "Gluten" },
        { id: 5, name: "beans", accronym: "Beans" }
      ])
    };
  },
  methods: {
    selectPicture() {
      let context = imagepicker.create({
        mode: "single"
      });

      context
        .authorize()
        .then(function() {
          return context.present();
        })
        .then(selection => {
          selection.forEach(selected => {
            let img = new Image();
            img.src = selected;
            this.images = img;

            this.$store.commit("setImageRecuperee", true);
            console.log("taille:  " + JSON.stringify(this.images.src));
            if (selected.ios) {
              console.log("we are on ios");
              const ios = selected.ios;
              if (ios && ios.mediaType === PHAssetMediaType.Image) {
                const opt = PHImageRequestOptions.new();
                const imageData = Object.create(NSData);
                const dataUTI = "";
                const orientation = Object.create(UIImageOrientation);
                const info = Object.create(NSDictionary);
                opt.version = PHImageRequestOptionsVersion.Current;
                PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(
                  //ios, opt, (imageData: NSData, dataUTI: string, orientation: UIImageOrientation, info: NSDictionary<any, any>) => {
                  ios,
                  opt,
                  (imageData, dataUTI, orientation, info) => {
                    console.log(
                      info.objectForKey("PHImageFileURLKey").toString()
                    );
                  }
                );
              }
            }
            if (selected.android) {
              console.log("we are on android");
              //console.log(JSON.stringify(selected));
              this.$store.commit("setImagePath", this.images.src._android);
              console.log("path        " + this.$store.getters.imagePath);

              //console.log("img.src   :  "+JSON.stringify(img.src))
            }
          });
        })
        .catch(function(e) {
          console.log("error in selectPicture", e);
        });
    },
    deletePicture(event) {
      //console.log("eeeeeeeeeeee"+ this.images.indexOf({img})
      // this.images.splice(this.images.indexOf(img),1);
    },
    takePicture() {
      camera
        .requestPermissions()
        .then(() => {
          camera
            .takePicture({
              width: 300,
              height: 300,
              keepAspectRatio: true,
              saveToGallery: false
            })
            .then(imageAsset => {
              if (imageAsset.ios) {
                console.log("i     o     s");

                const ios = imageAsset.ios;
                if (ios && ios.mediaType === PHAssetMediaType.Image) {
                  const opt = PHImageRequestOptions.new();
                  const imageData = Object.create(NSData);
                  const dataUTI = "";
                  const orientation = Object.create(UIImageOrientation);
                  const info = Object.create(NSDictionary);
                  opt.version = PHImageRequestOptionsVersion.Current;
                  PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(
                    //ios, opt, (imageData: NSData, dataUTI: string, orientation: UIImageOrientation, info: NSDictionary<any, any>) => {
                    ios,
                    opt,
                    (imageData, dataUTI, orientation, info) => {
                      console.log(
                        info.objectForKey("PHImageFileURLKey").toString()
                      );
                    }
                  );
                }
              }
              if (imageAsset.android) {
                console.log("a    n    d   r   o   i   d  ");
                this.$store.commit("setImagePath", imageAsset.android);
              }
              let img = new Image();
              img.src = imageAsset;
              this.images = img;
              //this.images.push(img);
              this.$store.commit("setImageRecuperee", true);
              //console.log('ive got '+this.images.length+' images now.');
            })
            .catch(e => {
              console.log("error:", e);
            });
        })
        .catch(e => {
          console.log("Error requesting permission");
        });
    },
    onItemTap({ index, object }) {
      this.$store.commit("set" + this.options.getItem(index).accronym, true);
    },
    deselection({ index, object }) {
      this.$store.commit("set" + this.options.getItem(index).accronym, false);
    },
    submit() {
      //submit to server
      // file path and url
      var file = this.$store.getters.imagePath;
      var url = "http://210.146.64.139:8080/MealRecorder/save_file";

      var name = file.substr(file.lastIndexOf("/") + 1);
      //console.log("image name:---------------------" + name);
      // upload configuration
      var bghttp = require("nativescript-background-http");
      var session = bghttp.session("image-upload");
      var params = [
        { name: "patientID", value: "12345" },
        { name: "imageFile", filename: file, mimeType: "image/jpg" }
      ];
      var imageFile = {
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "File-Name": name
        },
        description: "Uploading " + name
      };
      var task = session.multipartUpload(params, imageFile);
      task.on("complete", event => {
        console.log("Uploaded `" + this.images + "`");
        this.$store.commit("setImageRecuperee", false);
        alert("Image uploaded").then(() => {
        this.$navigateTo(newMeal);
        });
      });
      task.on("error", event => {
        console.log(event);
        console.log("Could not upload `" + this.images + "`. " + event.error);
        this.$store.commit("setImageRecuperee", false);
        alert("Image not uploaded").then(() => {
          console.log("Alert dialog closed.");
        });
      });
    },
    goBack() {
      this.$store.commit("setImageRecuperee", false);
      this.$navigateTo(questions2);
    }
  }
};
</script>