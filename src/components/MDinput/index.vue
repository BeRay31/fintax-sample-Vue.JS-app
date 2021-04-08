<template>
  <div :class="computedClasses" class="material-input__component">
    <div>
      <input
        v-if="type === 'email'"
        v-model="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        type="email"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'url'"
        v-model="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        type="url"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'number'"
        v-model="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :step="step"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :max="max"
        :min="min"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        type="number"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'password'"
        v-model="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :max="max"
        :min="min"
        :required="required"
        type="password"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'tel'"
        v-model="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        type="tel"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      >
      <input
        v-if="type === 'text'"
        v-model="currentValue"
        :name="name"
        :placeholder="fillPlaceHolder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        type="text"
        class="material-input"
        @focus="handleMdFocus"
        @blur="handleMdBlur"
        @input="handleModelInput"
      >
      <span class="material-input-bar" />
      <label class="material-label">
        <slot />
      </label>
    </div>
  </div>
</template>

<script>
// From previous project
// Task handled, Child -> Parent communication
export default {
  name: 'MdInput',
  props: {
    icon: String,
    name: String,
    type: {
      type: String,
      default: "text"
    },
    value: [String, Number],
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    min: String,
    max: String,
    step: String,
    minlength: Number,
    maxlength: Number,
    required: {
      type: Boolean,
      default: true
    },
    autoComplete: {
      type: String,
      default: "off"
    },
    smallest: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      currentValue: this.value,
      focus: false,
      fillPlaceHolder: null
    };
  },
  computed: {
    computedClasses() {
      return {
        "material--active": this.focus,
        "material--disabled": this.disabled,
        "material--raised": Boolean(this.focus || this.currentValue), // has value
        "material-smallest": this.smallest
      };
    }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue;
    }
  },
  methods: {
    handleModelInput(event) {
      const value = event.target.value;
      this.$emit("input", value);
      this.$emit("change", value);
    },
    handleMdFocus(event) {
      this.focus = true;
      this.$emit("focus", event);
      if (this.placeholder && this.placeholder !== "") {
        this.fillPlaceHolder = this.placeholder;
      }
    },
    handleMdBlur(event) {
      this.focus = false;
      this.$emit("blur", event);
      this.fillPlaceHolder = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
