<template>
    <v-container>
        <v-form ref="form">
            <v-textarea required v-model="content" name="addPost" filled label="Say Hello world !" auto-grow
                value="Hello world !">
            </v-textarea>
            <div class="button-container">
                <v-btn color="#D06A6C" @click="reset" style="color: #fff;">
                    Reset
                </v-btn>
                <v-btn color="#78d06a" class="mr-4" @click="validate" style="color: #fff;">
                    Envoyer
                </v-btn>

            </div>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: 'AddPost',

    data: () => ({
        content: '',

    }),
    methods: {
        validate() {
            console.log(content);
        },
    },
    reset() {
        this.$refs.form.reset()
    }
}
</script>


<style scoped>
.button-container {
    display: flex;
    justify-content: space-between;
}
</style>