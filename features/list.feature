Feature: List samples
  As a new team member
  I want to list all the samples
  So I can use the correct one

Scenario: There is at least one sample
  Given the developer types "ust list"
  When she enters the command
  Then she should see "usage" as sample
    And she should see "command" as sample
    And she should see "domain" as sample
