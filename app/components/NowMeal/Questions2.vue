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
        <StackLayout class="condition-elements-meal-box">
          <RadListView
            ref="listView"
            for="meal in meals"
            @itemTap="onItemTap"
            @itemDeselected="deselection"
            selectionBehavior="Press"
            multipleSelection="false"
          >
            <v-template>
              <StackLayout class="item" orientation="vertical">
                <Label :text="meal.name" class="meals"></Label>
              </StackLayout>
            </v-template>
          </RadListView>
        </StackLayout>
        <StackLayout class="condition-elements-box-sliders">
          <StackLayout class="slider_detail">
            <Label text="Appetite" class="A_and_C" textWrap="true"/>
            <Slider minValue="0" maxValue="2" v-model="userAppetite"/>
          </StackLayout>
          <StackLayout class="slider_detail">
            <Label text="Condition" class="A_and_C" textWrap="true"/>
            <Slider minValue="0" maxValue="2" v-model="userCondition"/>
          </StackLayout>
          <FlexBoxLayout flexDirection="row" justifyContent="center" class="full-height-down">
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
              @tap="goForward"
            />
          </FlexBoxLayout>
        </StackLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>


<script>
import { ObservableArray } from "tns-core-modules/data/observable-array";
import feeling from "../CS/HowDoYouFeel";
import final from "../meal_pic/final_invest";
export default {
  data() {
    return {
      meals: new ObservableArray([
        {
          name: "Breakfast",
          common: "Meal"
        },
        {
          name: "Lunch",
          common: "Meal"
        },
        {
          name: "Dinner",
          common: "Meal"
        },
        {
          name: "Snack",
          common: "Meal"
        }
      ]),
      userAppetite: 0,
      userCondition: 0
    };
  },
  methods: {
    onItemTap({ index, object }) {
      //Save value in the store
      // console.log("0000000000000000000000000000000000000000000  "+this.meals.getItem(index).common+"      "+object);
      this.$store.commit(
        "set" + this.meals.getItem(index).common,
        this.meals.getItem(index).name
      );
    },
    goForward() {
      if (this.userAppetite == 0) {
        this.$store.commit("setAppetite", "Not hungry");
      } else if (this.userAppetite == 1) {
        this.$store.commit("setAppetite", "hungry");
      } else if (this.userAppetite == 2) {
        this.$store.commit("setAppetite", "Ravenous");
      }

      if (this.userCondition == 0) {
        this.$store.commit("setCondition", "Not feeling well");
      } else if (this.userCondition == 1) {
        this.$store.commit("setCondition", "Not bad");
      } else if (this.userCondition == 2) {
        this.$store.commit("setCondition", "SUper genki");
      }

      this.$navigateTo(final);
    },
    goBack() {
      this.$navigateTo(feeling, {
        animated: true,
        transition: {
          name: "fade",
          duration: 1000,
          curve: "linear"
        }
      });
    },
    deselection({ index, object }) {
      let itemSelected = this.meals.getItem(index).common;
    }
  }
};
</script>

