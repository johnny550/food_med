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
        <!--  @tap="$refs.drawer.nativeView.showDrawer()" -->
      </GridLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer" drawerContentSize="160" drawerLocation="Right">
      <StackLayout ~drawerContent backgroundColor="#ffffff" class="drawer-placer">
        <!-- <Label class="drawer-header" text="Drawer"/> -->

        <Label class="drawer-item" text="Notifications"/>
        <Label class="drawer-item" text="Logout"/>
      </StackLayout>
      <StackLayout ~mainContent>
        <Label 
        text="Please specify how you felt after your previous meal by selecting one or more options below"
        textWrap="true"
        class="announcer"/>
        <RadListView
          ref="listView"
          for="question in questions"
          orientation="vertical"
          height="75%"
          selectionBehavior="Press"
          multipleSelection="true"
          @itemTap="onItemTap"
          @itemDeselected="deselection"
          class="questionnaire-style"
        >
          <!-- @itemTap="onItemTap"-->
          <v-template>
            <FlexBoxLayout id="place" class="condition-elements" :key="question.id">
              <!-- Shows the list item label in the default color and style. -->

              <StackLayout :id="question.id" class="check-drawer"></StackLayout>
              <Label clas="el" :text="question.text" textWrap="true" style="margin-top: 20"/>
              <!-- <Switch v-model="question.bool" /> -->
            </FlexBoxLayout>
          </v-template>
        </RadListView>

        <FlexBoxLayout flexDirection="column" justifyContent="center" class="full-height">
          <Image
            src="~/assets/images/icon_progress.png"
            width="50"
            height="50"
            class="icon-margin"
            @tap="nextPage"
          />
        </FlexBoxLayout>
        <!--{{itemEnabled}} -->
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import q2 from "../NowMeal/Questions2";
import { Image } from "tns-core-modules/ui/image";
import { Page } from "tns-core-modules/ui/image";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
export default {
  data() {
    return {
      questions: new ObservableArray([
        {
          id: 1,
          text: "Difficulties swallowing",
          accronym: "SwallowingDifficulties"
        },
        {
          id: 2,
          text: "Feelt solid food stuck in my chest",
          accronym: "StuckFood"
        },
        {
          id: 3,
          text: "Had loose stools",
          accronym: "LooseStools"
        },
        {
          id: 4,
          text: "Had a sudden bowel movement",
          accronym: "SuddenBowelMvt"
        },
        {
          id: 5,
          text: "Felt heaviness in my stomach",
          accronym: "StomachHeaviness"
        },
        {
          id: 6,
          text: "Lower abdomen bloating",
          accronym: "AbdomenBloating"
        },
        { id: 7, text: "Fatigue", accronym: "Fatigue" },
        { id: 8, text: "Weakness", accronym: "Weakness" }
      ])
    };
  },
  methods: {
    nextPage() {
      /* console.log(
        "in store weakness-------------------------" + this.$store.getters.weakness
      ) ;
            console.log(
        "in store ftaigue-------------------------" + this.$store.getters.fatigue
      );
            console.log(
        "in store loose stools-------------------------" + this.$store.getters.looseStools
      );
                  console.log(
        "in store stuck Food-------------------------" + this.$store.getters.stuckFood
      );
                        console.log(
        "in store swallowingDifficulties-------------------------" + this.$store.getters.swallowingDifficulties
      );
                        console.log(
        "in store suddenBowelMvt-------------------------" + this.$store.getters.suddenBowelMvt
      );
                        console.log(
        "in store stomachHeaviness-------------------------" + this.$store.getters.stomachHeaviness
      );
                        console.log(
        "in store abdomenBloating-------------------------" + this.$store.getters.abdomenBloating
      ); */

      this.$navigateTo(q2);
    },
    onItemTap({ index, object }) {
      //parameter: event when no observable array
      const newImage = new Image();
      newImage.src = "~/assets/images/icon_check.png";
      newImage.height = 20;
      newImage.width = 20;
      var frame = require("ui/frame");
      var myPage = frame.topmost().currentPage;
      var place = myPage.getViewById(this.questions.getItem(index).id);
      place.addChild(newImage);
      console.log("image srccc:  " + place);

      this.$store.commit("set" + this.questions.getItem(index).accronym, true);
      //no observable array
      // this.$store.commit("set" + event.item.accronym, true);
      //save all answers in the store
      /*      var variableName= event.item.getterAccronym

console.log("getter called through  "+variableName )
console.log("checking if store reference is working:   "+this.$store.getters.variableName)
      if(this.$store.getters.variableName === true){
 this.$store.commit("set" + event.item.accronym, false);
 
      console.log("onItemTap****************************************"+this.$store.getters.variableName);
      }
      else{
         this.$store.commit("set" + event.item.accronym, true);
         console.log("onItemTap//////////////////////////////////////////////"+this.$store.getters.variableName);
      } */
    },
    deselection({ index, object }) {
      var frame = require("ui/frame");
      var myPage = frame.topmost().currentPage;
      var place = myPage.getViewById(this.questions.getItem(index).id);
      place.removeChildren();
      // let itemSelected = this.questions.getItem(index);
      this.$store.commit("set" + this.questions.getItem(index).accronym, false);
    }
  }
};
</script>
