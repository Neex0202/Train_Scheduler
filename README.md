# Train_Scheduler

Pseudo Code

1. Create HTML Skeleton
	a. header (.jumbotron)
	b. Train Info Table
		i. Name (defined)
		ii. Destination (defined)
		iii. Frequency (defined)
		iv. Next Arrival (Calculate)
		v. Minutes Away (Calculate)
	c. Train Input Form

2. Link Firebase && Test Link

3. Event listener for submit buttonbn 
	a. event.preventDefault();
	b. define variables for jQuery input objects
		i. Train Name
		ii. Destination
		iii. moment.JS for time
		iv. frequency (min)

	c. Create an object holding respective train info
	d. Push object to Firebase
	e. Console.log (object items)
	f. Clear Input forms

4. Event listener for value change in Firebase (specifically "CHILD_ADDED")
	a. console.log(snapshot.val())
	b. generate varibles for snapshot.val() items
	c. console.log(variables) to test
	d. moment.JS logic to calcualte Next Arrival and Minutes Away
	e. Append to table

