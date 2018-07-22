import React from "react"
import { shallow } from "enzyme"
import AppCounter from "./AppCounter"

describe("test AppCounter", () => {
  let wrapper, MockIncrementer, MockResetter

  beforeEach(() => {
    MockIncrementer = jest.fn()
    MockResetter = jest.fn()
    wrapper = shallow(
      <AppCounter
        currentValue={0}
        incrementer={MockIncrementer}
        reset={MockResetter}
      />
    )
  })

  it("renders the AppCounter", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("pushing dbl dec button calls incrementer with -10", () => {
    wrapper.find({ id: "dbldecbtn" }).simulate("click")
    expect(MockIncrementer).toHaveBeenCalled()
    expect(MockIncrementer.mock.calls[0][0]).toBe(-10)
  })

  it("pushing dec button calls incrementer with -1", () => {
    wrapper.find({ id: "decbtn" }).simulate("click")
    expect(MockIncrementer).toHaveBeenCalled()
    expect(MockIncrementer.mock.calls[0][0]).toBe(-1)
  })

  it("pushing inc button calls incrementer with +1", () => {
    wrapper.find({ id: "incbtn" }).simulate("click")
    expect(MockIncrementer).toHaveBeenCalled()
    expect(MockIncrementer.mock.calls[0][0]).toBe(+1)
  })

  it("pushing dblinc button calls incrementer with +10", () => {
    wrapper.find({ id: "dblincbtn" }).simulate("click")
    expect(MockIncrementer).toHaveBeenCalled()
    expect(MockIncrementer.mock.calls[0][0]).toBe(+10)
  })

  it("should show changing class on result update", () => {
    wrapper.setProps({ currentValue: 2 })
    expect(wrapper).toMatchSnapshot()
  })
})
