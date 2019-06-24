<template>
  <Page>
    <ActionBar class="menu-bar">
      <GridLayout columns="auto, *">
        <Label text="Meal reporting application" col="0" class="el1"/>
        <Image src="~/assets/images/icon_user.png"  width="18" height="18" class="icon-left" @tap="$refs.drawer.nativeView.showDrawer()"/>
      </GridLayout>
    </ActionBar>
 <RadSideDrawer ref="drawer" drawerContentSize="160" drawerLocation="Right">
            <StackLayout ~drawerContent backgroundColor="#ffffff" class="drawer-placer">
               <!-- <Label class="drawer-header" text="Drawer"/> -->

                <Label class="drawer-item" text="Notifications"/>
                <Label class="drawer-item" text="Logout"/>
            </StackLayout>

            <GridLayout ~mainContent columns="auto" rows="auto">
                <Button class="my-button" text="New meal" @tap="addANewMeal"/>
            </GridLayout>
      </RadSideDrawer>

          </Page>
</template>


<script>
import conditionStatement from "../CS/HowDoYouFeel";
export default{
data () {
    return {
     
    };
  },
  methods: {
    onNavigationButtonTap() {
      frameModule.topmost().goBack();
    },
    onOpenDrawerTap() {
      console.log("opening")
      this.$refs.drawer.showDrawer();
    },
    onCloseDrawerTap() {
      this.$refs.drawer.closeDrawer();
    },
    onToggleDrawerTap() {
      this.$refs.drawer.toggleDrawerState();
    },
     addANewMeal(){
       this.$navigateTo(conditionStatement);
     }
  }
}
</script>
