import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Workout from '~/pages/Workout';
import WorkoutForm from '~/pages/Workout/Form';
import Exercise from '~/pages/Exercise';
import ExerciseForm from '~/pages/Exercise/Form';
import Student from '~/pages/Student';
import StudentForm from '~/pages/Student/Form';
import Account from '~/pages/Account';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Student} isPrivate />
      <Route path="/students/add/" exact component={StudentForm} isPrivate />
      <Route
        path="/students/edit/:id"
        exact
        component={StudentForm}
        isPrivate
      />

      <Route path="/exercises" exact component={Exercise} isPrivate />
      <Route path="/exercises/add/" exact component={ExerciseForm} isPrivate />
      <Route
        path="/exercises/edit/:id"
        exact
        component={ExerciseForm}
        isPrivate
      />

      <Route path="/workouts" exact component={Workout} isPrivate />
      <Route path="/workouts/add/" exact component={WorkoutForm} isPrivate />
      <Route
        path="/workouts/edit/:id"
        exact
        component={WorkoutForm}
        isPrivate
      />

      <Route path="/account" exact component={Account} isPrivate />
    </Switch>
  );
}
