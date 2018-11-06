<template>
    <div id="box">
        <full-calendar lang="zh" firstDay="1"></full-calendar>
    </div>
</template>
<script>
import fullCalendar from 'vue-fullcalendar';
export default {    
    components: {
        fullCalendar
    }
}
</script>
<style>
#box .full-calendar-body .dates .dates-events .events-week .events-day .day-number{
    float: left;
}
</style>

