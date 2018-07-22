import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

global.argsFromLastMockCall = mock => {
  const last = mock.mock.calls.length - 1
  return mock.mock.calls[last]
}
