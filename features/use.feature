Feature: Use Sample as Template
  As a developer
  I want use some sample files as if they were templates
  So I have less work to develop

Scenario: The sample is a file
  Given the developer types "ust use usage integrate"
  When she enters the command
  Then she should have "usage/integrate" in the sample's parent folder

Scenario: The sample is a directory
  Given the developer types "ust use command integration"
  When she enters the command
  Then she should have "commands/integration" in the sample's parent folder
