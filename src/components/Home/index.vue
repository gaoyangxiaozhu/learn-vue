<template lang="html">
    <div class="container">
        <div class="menu-list">
            <ul>
                <li>
                    <a v-link="{ name: 'calendar' }"> Calender</a>
                </li>
                <li>
                    <a v-link="{ name: 'progressbar' }"> Progress bar</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="sass">
.menu-list{
    min-height: 60px;
    margin-top: 10px;
    ul,li{
        list-style: none;
    }
    a{
        cursor:pointer;
        font-size: 35px;
    }
}

</style>
