import {useEffect} from 'react';
import IndexPage from "./component/IndexPage.tsx";
import Day from "./component/Day.tsx";
import DayList from "./component/DayList.tsx";
import EmptyPage from "./component/EmptyPage.tsx";
import Header from "./component/Header.tsx";
import DayHeader from "./component/DayHeader.tsx";
import CreateWord from "./component/CreateWord.tsx";
import CreateDay from "./component/CreateDay.tsx";
import NaverMap from "./component/NaverMap.tsx";
import KakaoMap from "./component/KakaoMap.tsx";
import Pagination from "./component/Pagination.tsx";
import {BrowserRouter, Route, Switch, useLocation} from 'react-router-dom';

function App() {
  // json-server --watch ./src/db/data.json --port 3001
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route exact path="/dayList">
            <DayList />
          </Route>
          <Route path="/day/:day">
            <Day />
          </Route>
          <Route path="/create_word">
            <CreateWord />
          </Route>
          <Route path="/create_day">
            <CreateDay />
          </Route>
          <Route path="/naver_map">
            <NaverMap />
          </Route>
          <Route path="/kakao_map">
            <KakaoMap />
          </Route>
          <Route path="/pagination">
            <Pagination />
          </Route>
          <Route>
            <EmptyPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
