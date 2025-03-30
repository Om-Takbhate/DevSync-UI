import Body from "./Body"
import Login from "./Login"
import NavBar from "./NavBar"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from "../utils/store/appStore"
import { lazy, Suspense } from "react"
import Loader from "./Loader"


const Feed = lazy(() => import('./Feed'))
const Profile = lazy(() => import('./Profile'))
const EditProfile = lazy(() => import('./EditProfile'))
const Connections = lazy(() => import('./Connections'))
const Requests = lazy(() => import('./Requests'))


function App() {

  return (
    <div className="flex flex-col ">
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/' element={<Body />} >
                <Route path='/' element={<Feed />} />
                <Route path='/login' element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path='/connections' element={<Connections />} />
                <Route path='/profile/edit' element={<EditProfile />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/requests/recieved' element={<Requests />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>

    </div>
  )
}

export default App
