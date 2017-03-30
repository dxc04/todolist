<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Task List - Webscope Code Challenge</title>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <script>
        window.user = {!! Auth::user() !!};
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>
</head>
<body>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Webscope Code Challenge</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="/logout">Logout</a></li>

            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>

<div id="app" class="container">
    {{-- Chartjs Section --}}
    <div class="row">
        <div class="col-md-12">
            <h2>Burndown Chart: <span style="color:royalblue">{!! Auth::user()->name !!}</span></h2>
            <line-chart :chart-data="datacollection" :options="options" :width="1200":height="500"></line-chart>
        </div>
    </div>

    {{-- Add New Task --}}
    <figure class="highlight">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <form @submit.prevent="createNewTask">
                    <div class="input-group input-group-lg">
                        <input type="text" class="form-control input-lg" placeholder="(min 5 characters)" v-model="newtask" required>
                        <span class="input-group-btn">
                        <button type="submit" class="btn btn-default btn-lg">+ New Task</button>
                    </span>
                    </div>
                </form>
            </div>
        </div>
    </figure>

    {{--Pending Tasks Section--}}
    <div class="row">
        <div class="col-md-6">
            <h3 class="text-center">Pending Tasks <span class="label label-warning">@{{ pendingTasks.length }}</span></h3>
            <div class="list-group">
                <a class="list-group-item" v-for="todo in pendingTasks" @click="toggleTaskStatus(todo)">@{{ todo.task }} <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a>
            </div>
        </div>

        {{--Completed Task--}}
        <div class="col-md-6">
            <h3 class="text-center">Completed Tasks <span class="label label-success">@{{ completedTasks.length }}</span></h3>
            <div class="list-group">
                <a class="list-group-item" v-for="todo in completedTasks" @click="toggleTaskStatus(todo)">@{{ todo.task }} <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></a>
            </div>
        </div>
    </div>
</div>

<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
