<template>
  <Page actionBarHidden="true">
     <ActionBar title="login" class="action-bar"/> 
    <Gradient direction="to right" colors="#39B994,#337FC7" class="test">
      <FlexBoxLayout flexDirection="column" justifyContent="center" class="full-height">
        <Image src="~/assets/images/nsvue_logo.png" class="logo-container"/>

        <StackLayout class="the-container">
          <FlexBoxLayout alignItems="center" class="border-bottom">
            <Image src="~/assets/images/icon_user.png" width="16" height="16" class="icon-margin"/>
            <TextField v-model="userNameInput" hint="User name" class="form-input"/>
          </FlexBoxLayout>

          <FlexBoxLayout alignItems="center" class="border-bottom">
            <Image src="~/assets/images/icon_lock.png" width="16" height="16" class="icon-margin"/>
            <TextField v-model="passwordInput" hint="Password" secure="true" class="form-input"/>
          </FlexBoxLayout>

          <Button class="my-button" text="Login" @tap="onButtonTap"/>
        </StackLayout>
      </FlexBoxLayout>
    </Gradient>
  </Page>
</template>

<script>
import newm from "../MealSubmission/NewM";
export default {
  data() {
    return {
      userNameInput: "",
      passwordInput: ""
    };
  },
  methods: {
    onButtonTap() {
      //this.$router.pushClear('NewMeal')
      this.$navigateTo(newm);
    }
  }
};
</script>
