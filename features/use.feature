Feature: Use Sample as Template
  As a developer
  I want use some sample files as if they were templates
  So I have less work to develop

Scenario: The sample is a file
  Given the developer types "ust use usage integrate"
  When she enters the command
  Then she should have "usage/integrate" in the sample's parent folder

Scenario: The sample is a directory
  Given the developer types "ust use command IntegrationTest"
  When she enters the command
  Then she should have "commands/IntegrationTest" in the sample's parent folder
    And "commands/IntegrationTest" should have a "package.json"
    And "commands/IntegrationTest" should have a "IntegrationTest.js"
    And "commands/IntegrationTest" should have a "IntegrationTest.test.js"
