export type Translations = {
  about: 'about';
  contact: 'contact';
  home: 'home';
  'sign-in': 'email_label' | 'password_label' | 'submit_text';
  translation: 'Hello world';
  validation:
    | 'default'
    | 'required'
    | 'oneOf'
    | 'notOneOf'
    | 'length'
    | 'length_plural'
    | 'minStr'
    | 'minStr_plural'
    | 'maxStr'
    | 'maxStr_plural'
    | 'matches'
    | 'email'
    | 'url'
    | 'trim'
    | 'lowercase'
    | 'uppercase'
    | 'minNum'
    | 'maxNum'
    | 'lessThan'
    | 'moreThan'
    | 'positive'
    | 'negative'
    | 'integer'
    | 'minDate'
    | 'maxDate'
    | 'noUnknown'
    | 'minArr'
    | 'minArr_plural'
    | 'maxArr'
    | 'maxArr_plural'
    | 'this_field';
};
