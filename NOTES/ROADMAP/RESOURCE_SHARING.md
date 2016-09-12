# Terrafarm Roadmap

## Resource Sharing

### Story
Let’s look at 4 entities that a user creates: an Organization, a Project, a Task, and a Resource.

Organizations are parent objects for Projects, and Projects are parent objects for Tasks.

Organizations, Projects, and Tasks can have Wish Lists. A Wish List is a list of items that describe desired resources. A Wish List has a text field that is something the user just types.

A resource owner may offer one of his resources to an Organization, Project, or Task. If he is responding to a Wish List item, he should be able to indicate that in the offer.

From the other side, an administrator for an Organization, Project, or Task may identify someone else’s resource as being a good fit for something on their Wish List. That person would “Request” the resource and indicate the Wish List item that the Resource addresses.

Depending on which party initiates the potential allocation, the other party is given a notice and has the ability to respond Yes or No.

In the future I would like to get more fine-grained about allocations by adding a Resource Availability mechanism. This would be something that describes how much access to that resource is being allocated. Like if I’m saying you can use this tractor for your project, it would say you can use for up to a week. And then on that Resource’s page, there would be a calendar for showing the allocation schedule.

This last part isn’t an top priority at present, but just something on the roadmap.
