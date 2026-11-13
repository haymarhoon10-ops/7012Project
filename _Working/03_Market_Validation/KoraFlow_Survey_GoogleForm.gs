/**
 * IT7012 Milestone 3: Casual Football Survey (version 2)
 * Follows the Week 2 Session 2 activity: 8 to 10 questions, under 3 minutes,
 * one screening question, neutral wording, mutually exclusive choices,
 * balanced labelled scales, no names or phone numbers, does not promote the idea.
 *
 * HOW TO USE
 * 1. Go to https://script.google.com and click New project.
 * 2. Delete everything in the editor and paste this whole file.
 * 3. Click Save, then Run (function: createSurvey). Allow the permissions.
 *    If Google says the app isn't verified, click Advanced, then continue.
 * 4. Open the Execution log: it prints the link to share, the edit link and the responses sheet.
 */
function createSurvey() {
  var form = FormApp.create('Casual Football in Bahrain: Student Survey');
  form.setDescription(
    'We are IT students at Bahrain Polytechnic studying how people organize casual football with friends. ' +
    'It takes about 3 minutes. It is anonymous: we do not ask for your name or phone number. ' +
    'There are no right or wrong answers. Please answer about what actually happened, not what you would do.');
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setConfirmationMessage('Thank you. Your answers help our university project.');

  // Q1 Screening: people who did not play finish here.
  var q1 = form.addMultipleChoiceItem()
    .setTitle('In the last 3 months, how often did you play casual football with friends (for example 5-a-side or 7-a-side)?')
    .setRequired(true);
  var main = form.addPageBreakItem().setTitle('Your recent games');
  q1.setChoices([
    q1.createChoice('Once a week or more', main),
    q1.createChoice('2 to 3 times a month', main),
    q1.createChoice('About once a month', main),
    q1.createChoice('Less than once a month', main),
    q1.createChoice('I did not play in the last 3 months', FormApp.PageNavigationType.SUBMIT)
  ]);

  // Q2 Context: role
  form.addMultipleChoiceItem()
    .setTitle('In your group, who usually arranges the games?')
    .setChoiceValues(['I usually arrange them', 'Someone else usually arranges them', 'We take turns'])
    .setRequired(true);

  // Q3 Frequency of the problem
  form.addMultipleChoiceItem()
    .setTitle('Think about your last 5 games. In how many did the number of players change after the game was arranged?')
    .setChoiceValues(['0', '1', '2', '3', '4 or 5', 'I don\'t remember'])
    .setRequired(true);

  // Q4 Severity / consequence
  form.addMultipleChoiceItem()
    .setTitle('In the last 3 months, how many of your games were cancelled or almost cancelled because of player numbers?')
    .setChoiceValues(['None', '1', '2 to 3', '4 or more', 'I don\'t remember'])
    .setRequired(true);

  // Q5 Current solution
  form.addMultipleChoiceItem()
    .setTitle('How does your group mainly confirm who is coming to a game?')
    .setChoiceValues([
      'Messages in a WhatsApp group',
      'A WhatsApp poll',
      'A sports app (for example Malaeb)',
      'Phone calls or private messages',
      'We don\'t confirm, people just turn up'])
    .showOtherOption(true)
    .setRequired(true);

  // Q6 Impact: time cost
  form.addMultipleChoiceItem()
    .setTitle('The last time someone dropped out of a game, how long did it take to sort it out (find a replacement or change the plan)?')
    .setChoiceValues([
      'Nobody has dropped out recently',
      'Less than 10 minutes',
      '10 to 30 minutes',
      'More than 30 minutes',
      'We could not sort it out'])
    .setRequired(true);

  // Q7 Impact: money
  form.addMultipleChoiceItem()
    .setTitle('Think about your last 5 games. In how many did at least one person pay their share late or not at all?')
    .setChoiceValues(['0', '1', '2', '3', '4 or 5', 'I don\'t know'])
    .setRequired(true);

  // Q8 Satisfaction with the current way (balanced, labelled)
  form.addMultipleChoiceItem()
    .setTitle('How satisfied are you with the way your games are arranged now?')
    .setChoiceValues(['Very dissatisfied', 'Dissatisfied', 'Neither satisfied nor dissatisfied', 'Satisfied', 'Very satisfied'])
    .setRequired(true);

  // Q9 What matters most in a solution (up to 2)
  var q9 = form.addCheckboxItem()
    .setTitle('When a game is being arranged, which TWO things matter most to you?')
    .setChoiceValues([
      'Knowing early who is definitely coming',
      'Everyone paying their share on time',
      'Finding a replacement quickly',
      'Fair and balanced teams',
      'Booking a pitch easily',
      'A low cost per person'])
    .setRequired(true);
  q9.setValidation(FormApp.createCheckboxValidation()
    .setHelpText('Please choose up to 2.').requireSelectAtMost(2).build());

  // Q10 Optional open question
  form.addParagraphTextItem()
    .setTitle('Optional: what was the most frustrating part of the last game you arranged or joined?');

  // For our records only (not a research question)
  form.addMultipleChoiceItem()
    .setTitle('For our records: which student shared this survey with you?')
    .setHelpText('This only checks that each team member collected their share of responses.')
    .setChoiceValues(['Hasan', 'Sayed Ali', 'Hussain'])
    .setRequired(true);

  var sheet = SpreadsheetApp.create('Casual Football Survey v2: Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // New script-made forms can start unpublished. Publish so people can answer.
  try { form.setPublished(true); } catch (e) { Logger.log('Open the edit link and click Publish if the form is not accepting responses.'); }
  form.setAcceptingResponses(true);

  Logger.log('Share this link: ' + form.getPublishedUrl());
  Logger.log('Edit the form:   ' + form.getEditUrl());
  Logger.log('Responses sheet: ' + sheet.getUrl());
}
