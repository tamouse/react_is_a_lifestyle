# React is a Lifestyle

[GDIMPLS]: http://gdiminneapolis.com "Girl, Develop It! Minneapolis Chapter"

In a recent [GDIMPLS] class, "Intermediate JavaScript", the class was learning about JS libraries and frameworks. The analogy was made the something was just a library if it was collection of tools, while a framework was a lifestyle. Somewhat tongue-in-cheek, nevertheless, still fairly true. The distinction is once you start with a framework, you generally stay within that framework, and never mix in other frameworks. Whereas with a library you can pick and choose what tools to use, and pick up other libraries' tools as well.

To illustrate why React is a framework, we'll redo the Counter example from that class.

**NOTE:** this isn't meant as a tutorial, just an illustration.

[Counter]: src/components/Counter/index.js "The Counter React component"

The [Counter] React component is (hopefully) annotated; the level commentary is quite verbose and I don't ever spend this much time on commentary for components, even if they're reuseable like this one is. It is *very* important to document the API, however.

The Counter takes a render prop as it's children: it much be a function implementation. This provides a good separation of concerns:

- the Counter takes care of all the details of the counting logic
- the children render function takes are of displaying and activating the counter

This is where React becomes a definitely lifestyle: in building this, you start to adopt a way of thinking that's quite different than just assembling and using various collections of tools. Once you start using a framework on a project, it's *extremely* difficult to switch gears to another framework. A lifestyle is a commitment! :grin:
