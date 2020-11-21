
# University Chat

## What
University Chat is an online messaging application aimed at students at the University of Florida. University Chat provides students with course specific chat rooms to ask questions and have discussions with fellow classmates. 

## Why

University Chat serves as a quick source of information to students from any grade level or major. While some courses utilize various third party applications already, there is no standard chat. Additionally, the process for students to join these chats is non-standardized, sometimes posted on the course site and sometimes even requiring an invite from a chat member.

## How

University Chat solves this problem by holding the university's course list and having easily accessible list of course chats for each class that the university offers. This creates a standardized and  accessible way for students to join course chats they might've never been aware of in the first place.


# Technology

## React Native
University Chat leverages the extremely popular mobile application framework to develop the application for iOS and Android systems.
### Pros: 
* **(Mostly) Singular codebase.** As University Chat develops it will eventually need to have Android/iOS specific code to handle native integration, but having 99% of your code shared between the two systems in a single repository has **huge** benefits.
	* Halves development time. Arguably more or less, considering the pros of coding in only one language and the possibility that writing similar code in two different language will be faster than writing completely new code.
		* Time to develop and deploy features is **core** for every successful company, from startup to standard business to tech conglomerates.
* **It's fast enough.**
	* Look at some of the most popular mobile applications, created by the biggest companies in the world.  **They use React Native.**
		* There's a reason for this. Coding native is faster but for all but the most demanding applications React Native will deliver sufficient performance. At a certain level of performance, **users simply don't care** and often won't even notice the difference.
			* **If the users don't care, neither should you.**
* **Community Support.** 
	* React Native is open-source and while the core project might not be a complete solution, the open-source nature of the solution allows for the community to make up for these flaws.


### Cons: 
* **Speed.** 
	* The pros section states that React Native is fast enough, but is it really? And even if it is performant enough for the current application plan, the modern process of software development means that the plan will adjust and the load on the application might increase substantially.
		* Short Answer: I don't know.
		* Long Answer: It depends on your application and situation. Figure out how likely these adjustments might be or how load heavy they are likely to be. If you do go with React Native and new features increase load, there are optimization options available.
* **Native Support.** 
	* React Native has native support, as obviously indicated from it's name, but building an application for the environment it was designed for is going have much clearer-cut and more seamless integration with native features.
* **Beta.**
	*  Despite being widely used in the mobile application world, **React Native is still in beta**.
		* For the most part this is covered by community support, but this carries on to the last, and most frustrating, con on the list.
* **Bugs and Debugging.** This can be partially attributed to React Native's beta state and partially attributed to the suite of challenges an application has to deal with when implementing a framework for cross platform development.
	* You will get bugs that tell you very little. The stack trace will lead nowhere. Google, Github, and Stack Overflow are your friends.

## Firebase

University Chat uses Firebase, a MBaaS (mobile backend as a service), in order to maximize focus on what matters for the application:  rapid movement towards a MVP that looks and feels good for end users to use. A MBaaS might not offer as much power as a dedicated backend and can obscure the MVC model, but it lowers the amount of work a developer needs to do.

After writing in-depth about React Native I feel the need to do the same for Firebase, but I'll come back to this when I have both more time and more knowledge about the service. Logging/Analytics? Am I organizing my data correctly? Admin Tools?

## Additional Tools
### Expo
### Redux






