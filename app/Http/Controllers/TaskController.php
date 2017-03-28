<?php

namespace App\Http\Controllers;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use App\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::guard('api')->user();
        return $user->tasks;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'task' => 'required|min:5'
        ]);
        $user = Auth::guard('api')->user();
        $task = $user->tasks()->create([
            'task' => $request->task
        ]);
        return $task;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
//        throw new HttpResponseException(
//            response()->json([
//                'user_id' => ['Requested user has no privileges to modify this data.']
//            ], 422)
//        );
        $user = Auth::guard('api')->user();
        $this->validate($request, [
            'task' => 'required|min:5',
            'status' => 'boolean',
            'user_id' => Rule::in([$user->id])
        ]);
        $task = Task::find($id);
        $task->task = $request->task;
        $task->status = $request->status;
        $task->save();
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
