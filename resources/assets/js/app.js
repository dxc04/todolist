require('./bootstrap');
import LineChart from './components/LineChart';

var app = new Vue({
    el: '#app',
    components: {
        LineChart
    },
    data: {
        tasks: [],
        newtask: "",
        options: {},
        activities: [],
        datacollection: null,
        labels: [],
        pending_tasks_count: []
    },
    methods: {
        /**
         * To setup chart options
         */
        setupChartOptions() {
            this.options = {
                responsive: false,
                maintainAspectRatio: false
            };
        },
        /**
         * To fetch all tasks associated with the user
         */
        fetchAllTasks() {
            axios.get('/tasks?api_token='+user.api_token)
                .then((response) => {
                    this.tasks = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        /**
         * Helper function to generate the request data
         * @param taskItem
         * @returns {{item: *, statuses: {pending: Number, completed: Number}}}
         */
        generateRequestData(taskItem) {
            if (typeof(taskItem) !== 'object') {
                let taskObject = {
                    task: taskItem,
                    status: false
                };
                taskItem = taskObject;
            }
            var data = {
                item: taskItem,
                statuses: {
                    pending: this.pendingTasks.length,
                    completed: this.completedTasks.length
                }
            };
            return data;
        },
        /**
         * To create new task
         */
        createNewTask() {
            axios.post('/tasks?api_token='+user.api_token, this.generateRequestData(this.newtask))
                .then((response) => {
                    this.tasks.push(response.data.task_item);
                    this.newtask = '';
                    this.fillData({
                        label: moment(response.data.user_activity.created_at).format("HH:mm:ss"),
                        data: response.data.user_activity.pending_tasks
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        /**
         * To toggle the status of the task
         * @param taskItem
         */
        toggleTaskStatus(taskItem) {
            axios.put('/tasks/'+ taskItem.id +'/toggle?api_token='+user.api_token, this.generateRequestData(taskItem))
                .then((response) => {
                    taskItem.status = response.data.task_item.status;
                    this.fillData({
                        label: moment(response.data.user_activity.created_at).format("HH:mm:ss"),
                        data: response.data.user_activity.pending_tasks
                    });
                })
                .catch((error) => {
                    this.tasks.forEach((todo) => {
                        if (todo.id === taskItem.id) {
                            todo.status = ! taskItem.status;
                        }
                    });
                    console.error('Logging the error', error);
                });
        },
        /**
         * To fetch last house activities of the user
         */
        fetchActivitiesForLast60Minutes() {
            axios.get('/activities/last60minutes?api_token='+user.api_token)
                .then((response) => {
                    var activities = response.data;
                    console.info('Activities', response.data);
                    activities.forEach((activity) => {
                        this.labels.push(moment(activity.created_at).format("HH:mm:ss"));
                        this.pending_tasks_count.push(activity.pending_tasks);
                    }, this.labels, this.pending_tasks_count);
                    console.log('Activity Data: ', this.pending_tasks_count);
                    this.fillData();
                })
                .catch(function (error) {
                    console.error('Fetch Activities: ', error);
                });
        },
        /**
         * To fill data into the chart
         * @param newData
         */
        fillData (newData = {}) {
            if (! _.isEmpty(newData)) {
                this.labels.push(newData.label);
                this.pending_tasks_count.push(newData.data);
                // console.debug(this.$refs._chart);
            }
            this.datacollection = {
                labels: this.labels,
                datasets: [
                    {
                        label: "Pending Tasks",
                        pointRadius: 10,
                        backgroundColor: '#c7ecea',
                        borderColor: '#5E9732',
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "#226D82",
                        pointBorderWidth: 2,
                        pointBorderColor: "#5E9732",
                        data: this.pending_tasks_count
                    }
                ]
            };
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
        this.setupChartOptions();
        this.fetchAllTasks();
        this.fetchActivitiesForLast60Minutes();
        this.fillData();
    }
});
