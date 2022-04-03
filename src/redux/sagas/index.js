//! загрузка данных при инициализации приложения!

// import { call, fork, spawn, all, delay } from "redux-saga/effects";

// function* auth() {
//   yield delay(2000);
//   console.log("auth ok");
//   return true;
// }

// function* loadUsers() {
//   const request = yield call(fetch, "https://swapi.dev/api/people");
//   const data = yield call([request, request.json]);
//   console.log("data", data);
// }

// export function* loadBasicData() {
//   yield all([fork(auth), fork(loadUsers)]);
// }

// export default function* rootSaga() {
//   const sagas = [loadBasicData];

//   const retrySagas = yield sagas.map((saga) => {
//     return spawn(function* () {
//       while (true) {
//         try {
//           yield call(saga);
//           break;
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     });
//   });
//   yield all(retrySagas);
// }
//! загрузка данных при инициализации приложения!

import {
  call,
  spawn,
  all,
  take,
  fork,
  takeLatest,
  cancel,
  actionChannel,
} from "redux-saga/effects";
import loadBasicData from "./initialSaga";
import pageLoaderSaga from "./pageLoaderSaga";

export function* fetchPlanets() {
  console.log("LOAD_SOME_DATA-start");
  const response = yield call(
    fetch,
    "https://swapi.dev/api/planets"
    //! fetchPlanets(signal)-передать signal как аргумент для variant3
    // {
    //   signal,
    // }
  );
  const data = yield call([response, response.json]);
  console.log("LOAD_SOME_DATA - completed", data);
}

export function* loadOnAction() {
  //! 1-vriant выполнить только последний вызов, но в этом случае cancel происходит только для внутренний таски, но сам запрос при клике не отменяется
  // yield takeLatest("LOAD_SOME_DATA", fetchPlanets);
  // yield fork(fetchPlanets );
  //! 2-variant не блокирующий варинат при котором все вызовы будут выполнены
  // while (true) {
  //   yield take("LOAD_SOME_DATA");
  //   yield fork(fetchPlanets);
  // }
  // yield fork(fetchPlanets );
  //! 3-variant, в этом случае мы канселим вызовы и исполняем только последний вызов, for slow enternet
  // let task;
  // let abortController = new AbortController();
  // while (true) {
  //   yield take("LOAD_SOME_DATA");
  //   if (task) {
  //     abortController.abort();
  //     yield cancel(task);
  //     abortController = new AbortController();
  //   }
  //   task = yield fork(fetchPlanets, abortController.signal);
  // }
  //!4-variant при котором нам нужно обработать последовательно несколько запросов, в этом случае все вызовы (click)будут собраны в буфер, и последовательно вызваны и завершены - good for sockets
  const chanel = yield actionChannel("LOAD_SOME_DATA");
  while (true) {
    yield take(chanel);
    yield call(fetchPlanets);
  }
}

export default function* rootSaga() {
  const sagas = [
    // loadBasicData,
    // pageLoaderSaga,
    loadOnAction,
  ];

  const retrySagas = yield sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
  yield all(retrySagas);
}
