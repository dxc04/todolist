require('./bootstrap');

var app = new Vue({
    el: '#app',
    data: {
        tasks: [],
        newtask: "",
        options: {}
    },
    methods: {
        loadChartOptions() {
            var self = this;
            var chartOptions = {
                chart: {
                    type: 'spline',
                    marginRight: 10,
                    events: {
                        load: function () {
                            // set up the updating of the chart each second
                            var series = this.series[0];
                            setInterval(function () {
                                var x = (new Date()).getTime(), // current time
                                    y = self.$root.pendingTasks.length;
                                series.addPoint([x, y], true, true);
                            }, 60000);
                        }
                    }
                },
                title: {
                    text: 'Burndown Chart',
                    x: -20 //center
                },
                subtitle: {
                    text: 'Number of tasks that were not yet completed at each minute',
                    x: -20
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Tasks Pending'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ': ' + this.y + '</b>';
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'Task Pending',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: self.$root.pendingTasks.length
                            });
                        }
                        return data;
                    }())
                }]
            };
            this.options = chartOptions;
        },
        fetchAllTasks() {
            axios.get('/tasks?api_token='+user.api_token)
                .then((response) => {
                    this.tasks = response.data;
                    this.loadChartOptions();
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        createNewTask() {
            axios.post('/tasks?api_token='+user.api_token, { task: this.newtask })
                .then((response) => {
                    this.tasks.push(response.data);
                    this.newtask = '';
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        updateTaskStatus(task) {
            axios.put('/tasks/'+ task.id +'?api_token='+user.api_token, task)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    this.tasks.forEach((todo) => {
                        if (todo.id === task.id) {
                            todo.status = ! task.status;
                        }
                    });
                    console.error('Logging the error', error);
                });
        }
    },
    computed: {
        pendingTasks() {
            return this.tasks.filter(todo => ! todo.status);
        },
        completedTasks() {
            return this.tasks.filter(todo => todo.status);
        }
    },
    mounted() {
        this.fetchAllTasks();
    }
});

