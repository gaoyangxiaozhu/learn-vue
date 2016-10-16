<template lang="html">
  <div class="calendar calendar-container">
     <div class="calendar-header">
         <span class="prev-btn" @click="getPrevMonth">
             <i class="fa fa-angle-left fa-2x"></i>
         </span>
         <h1>
            {{ monthEns[calendar.month - 1] }}
            &nbsp;
            {{ calendar.year }}
         </h1>
         <span class="next-btn" @click="getNextMonth">
             <i class="fa fa-angle-right fa-2x" ></i>
         </span>
     </div>
     <div class="calendar-body">
         <table class="calendar-content">
             <thead class="weekdays">
                 <tr>
                     <th v-for="item in thItems"> {{ item }} </th>
                 </tr>
             </thead>
             <tbody>
                 <tr v-for="row in daysList" track-by="$index">
                     <td v-for="item in row" track-by="$index" @click.stop="jumpTo(item)" class="day-item" :class="{'selected' : selected(item) }">
                         {{ item }}
                     </td>
                 </tr>
             </tbody>
         </table>
     </div>
  </div>

</template>

<script>

const today = new Date()
const thItems = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
const getMonthLen = (year, month) => {
    // get next month's first day
    let nextMonth = new Date(year, month,  1) // year month+1 0:0:0
    nextMonth.setHours(nextMonth.getHours() - 2)
    return nextMonth.getDate()
}
const getFirstDay = (year, month) => {
    // get what day it is first day of the month
    let firstDay = new Date(year, month-1, 1)
    return firstDay.getDay()
}
export default {
    data(){
        return {
            calendar : {
                year : today.getFullYear(),
                month : today.getMonth() + 1,
                day : today.getDate()
            },
            current : {
                year : today.getFullYear(),
                month : today.getMonth() + 1,
                day : today.getDate()
            },
            monthEns: months,
            thItems: thItems
        }
    },
    computed:{
        daysList : function(){
            let _ = this
            let list = [ [] ]
            let monthLen = getMonthLen(_.calendar.year, _.calendar.month)

            let firstDay = getFirstDay(_.calendar.year, _.calendar.month)
            for(let i = 0; i < firstDay; i++){
                list[0].push('')
            }
            for(let j = 1; j <= monthLen; j++){
                let row = Math.floor(( j + firstDay - 1 ) / 7)
                list[row] = list[row] || []
                list[row].push(j)
            }

            return list
        }
    },
    methods:{
        getPrevMonth(event){
            let _ = this
            let month = _.calendar.month - 1
            let year = _.calendar.year

            if( month <= 0){
                month = month + 12
                year--
            }
            _.calendar.year = year
            _.calendar.month = month

        },
        getNextMonth(event){
            let _ = this
            let month = _.calendar.month + 1
            let year = _.calendar.year
            if( month > 12){
                month = month - 12
                year++
            }
            _.calendar.year = year
            _.calendar.month = month

        },
        jumpTo(day){
            let _ = this
            if(_.calendar.year != _.current.year || _.calendar.month != _.current.month || _.calendar.day != day){
                _.current.year = _.calendar.year
                _.current.month = _.calendar.month
                _.current.day = day
            }
        },
        selected(day){
            let _ = this
            return  _.calendar.year == _.current.year && _.calendar.month == _.current.month && _.current.day == day
        }
    }

}
</script>

<style lang="sass" scoped>

// calendar global variable

$calendarContainerWidth : 360px;

// calender header
$headerDefaultColor : #FCFBF8;
$headerDefaultHeight : 40px;
$headerDefaultBgColor :  #EA9078;

// calender body
$calendarContentDefaultColor: #999999;
$calendarContentDefaultBgColor: #ffffff;
$calendarContentHeaderColor: #DC6B6B;

//calendar item
$calendarContentItemHoverColor: darken($calendarContentDefaultColor, 10%);
$calendarContentItemHoverBgColor: #F5F1E9;
$calendarContentItemDefaultHeight: $calendarContainerWidth/7;
$calendarContentItemSelectedColor : #fff;
$calendarContentItemSelectedBgColor: #DC6B6B;

.calendar.calendar-container{
    width : $calendarContainerWidth;
    .calendar-header{
        height: $headerDefaultHeight;
        color: $headerDefaultColor;
        background-color: $headerDefaultBgColor;

        padding: 10px 0;
        overflow: hidden;

        .prev-btn, .next-btn, h1{
            float: left;
        }
        .prev-btn, .next-btn{
            width: 15%;
            height: 100%;

            position: relative;
            cursor: pointer;

            i{
                display: inline-block;
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: 20px;
            }
        }
        h1{
            margin : 0px;
            width: 70%;
            font-size: 22px;
            text-align: center;
        }
    }
    .calendar-body{
        background-color: $calendarContentDefaultBgColor;
        table > {
            thead, tbody {
                th, td {
                    color: $calendarContentDefaultColor;

                    height: $calendarContentItemDefaultHeight;
                    width: $calendarContentItemDefaultHeight;
                    padding: 0;

                    text-align: center;

                }
            }

            thead, .weekdays{
                th{
                    color: $calendarContentHeaderColor !important;
                }
            }
            tbody {
                td{
                    vertial-align: center;
                    cursor: pointer;
                    &:hover{
                        color: $calendarContentItemHoverColor;
                        background-color: $calendarContentItemHoverBgColor;
                    }

                    &.selected{
                        color: $calendarContentItemSelectedColor;
                        background-color: $calendarContentItemSelectedBgColor;

                    }


                }
            }
        }
    }
}
</style>
