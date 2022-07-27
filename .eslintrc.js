module.exports = {
    root:true,
    env:{
        node:true
    },
    extends: ["plugin:vue/recommended", "eslint:recommended"],
    parserOptions: {
      parser: "@babel/eslint-parser",
    },
    //其他规则
    rules:{
        //禁止使用var
        "no-var":2,
        "vue/multi-word-component-names":0
    }

}