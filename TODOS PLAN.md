
Learn more about dates and handling of. Re do naming logic in app for getting last session id. 
Write better seed data for this
Think about how to get student is and linking to calendar events better.//Just via the times?
Along with this is submitting sessions to the database
Might need to change addSession to be and update session
--add empty data with only times and Ids etc then update notes data

Adding date date db call etc
on click of calendar navigate to that session and bring up information



This will be a notes app for Music teachers (or any 1 to 1 regular teaching situation)

There are two different pages a 'Last Session' and a 'Current Session' 

Last session loads up the info from last session from the Data base and renders it on that page as read only.
Current Session takes in any notes from the forms and on submit adds it in the database. 
If you go to Current Session and submit the text on those forms, On refresh you can see that it has been added to the data base and now becomes the 'Last Session'. 

There are always two forms on a page. One has notes for the Student and one has notes for the Teacher. 
The redux/global state is being used to store both the last sessions and current session notes, this means you can switch between the two pages (so a user can refer back to last sessions notes) without losing any notes you have started writing for the current session. 

To Do: (this is mostly just personal reference but if you are wondering what this app is meant to be)

Implement users/auth0 

Student notes should be emailed to the student on submit
-look into Mail Chimp and ask Eli about it I think she dealt with this

On opening the app the user will find the last session notes for the student whos session it currently is (based on time/some kind of calender library/api)

I.E a teacher will open the app and if it is time for the scheduled seesion it will display that students last session notes.
Say lil jimmy has his piano lesson at 4pm and it's 4pm if you open the app it will show you last weeks lesson notes and be ready for you to put in notes for this week. 

Potentially an edit function to change any notes although I can't really think why you would want to edit old notes. Probably build this for practise anyway.

Add the proper calendar funcationality 
//Calendar stuff from JP 