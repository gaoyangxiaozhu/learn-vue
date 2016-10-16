<template lang="html">
   <div class="progress progress-active" :class="progressClass">
       <div class="progress-bar" :class="barClass" :style="{ width: percent + '%'}">
           <span class="progress-text">
               Progress: <em v-if="percent < 100"> {{ percent }}</em> <em v-else>Complete</em>
           </span>
       </div>

   </div>

</template>

<script>

export default {
    data(){
        return {
            percent : 70,
            orange : 30,
            yellow : 55,
            green : 85,
        }
    },
    created(){

    },
    computed:{
        progressClass: function(){
            return {
                'progress-complete' : this.percent >= 100 ? true : false
            }
        },
        barClass: function(){
            let _ = this
            return {
                'progress-bar-orange': _.percent >=  _.oragne && _.percent < _.yellow ? true : false,
                'progress-bar-yellow': _.percent >= _.yellow && _.percent <= _.green ? true: false,
                'progress-bar-green' :  _.percent >= _.green && _.percent < 100 ? true : false,
                'progress-bar-blue' : _.percent >= 100 ? true : false
            }
        }
    },
    methods:{
    }

}
</script>

<style lang="sass" scoped>
$red: #EA9078;
$blue: #71CE73;
$green: #65C3AD;
$yellow: #E8C060;
$orange: #FF9C2A;

$progressBorderColor: #BDBDBD;
$progressDefaultHeight: 25px;
$progressDefaultWidth: 400px;


@mixin innerColor( $color: #0db6e0 ) {

  background-color: transparentize( $color, 0.05 );
  background-image:
    linear-gradient(
      90deg,
      transparentize( lighten( $color, 5% ), 1 ) 10%,
      transparentize( lighten( $color, 10% ), 0.2 ) 30%,
      transparentize( lighten( $color, 15% ), 0 ) 70%,
      transparentize( lighten( $color, 10% ), 0.2 ) 80%,
      transparentize( lighten( $color, 5% ), 1 ) 90%
    );

  border-color: lighten( $color, 20% );

}

.progress {

  font-size: 1.2em;
  height: $progressDefaultHeight;
  width: $progressDefaultWidth;

  background: #F5F5F5;
  border: 1px solid transparent;
  border-radius: 0;
  box-shadow: 0 0 0 transparent;

  &.progress-active .progress-bar {
      opacity: 1;
  }

  .progress-text {

    width: 20em;
    padding: 0 0.9em;
    position: absolute;
    left: 19%;

    em {
      font-style: normal;
    }
  }

  .progress-bar {

    color: white;
    font-size: 12px;
    text-align: center;
    text-shadow: 0 1px 1px rgba(0,0,0,0.6);
    line-height: 19px;

    display: block;
    position: relative;


    width: 0%;
    height: 100%;
    opacity: 0;

    border: 1px solid $progressBorderColor;

    background-size: 100px 30px;
    background-position: -20% center;
    background-repeat: no-repeat;

    transition:
        opacity 0.2s ease,
        width 0.8s ease-out,
        background-color 1s ease,
        border-color 0.3s ease,
        box-shadow 1s ease;

    animation: pulse 2s ease-out infinite;

    @include innerColor($red);

    &.progress-bar-orange {
      @include innerColor($orange);
    }

    &.progress-bar-yellow {
      @include innerColor($yellow);
    }

    &.progress-bar-green {
      @include innerColor($green);
    }
    &.progress-bar-blue {

      @include innerColor($blue);

    }
    &:before,
    &:after {
      content: "";
      position: absolute;

      right: -1px;
      top: -10px;

      width: 1px;
      height: 40px;

    }

    &:before {

      width: 7px;
      right: -4px;

      background:
        radial-gradient(
          ellipse at center,
          rgba(255,255,255,0.4) 0%,
          rgba(255,255,255,0) 75%
        );

    }

    &:after {

      background:
        linear-gradient(
          to bottom,
          rgba(255,255,255,0) 0%,
          rgba(255,255,255,0.3) 25%,
          rgba(255,255,255,0.3) 75%,
          rgba(255,255,255,0) 100%
        );

    }

  }

  .progress-complete {
    .progress-bar {

      animation: none;

      &:after,
      &:before {
        opacity: 0;
      }
    }
  }
}

@keyframes pulse {
  0% {
    background-position: -50% center, right center, left center;
  }

  100% {
    background-position: 150% center, right center, left center;
  }

}

</style>
