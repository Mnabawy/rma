package com.app.com.khadmatna;

import android.os.Bundle; // add this
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.i18nmanager.I18nUtil;

public class MainActivity extends ReactActivity {


   @Override
  protected void onCreate(Bundle savedInstanceState) {
    // RNBootSplash.init(this); // <- initialize the splash screen



    // FORCE LTR
    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
    super.onCreate(null); // or super.onCreate(null) with react-native-screens
  }
  
  @Override
  protected String getMainComponentName() {
    return "CRMA";
  }
}
