# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Mutation](#mutation)
  * [Objects](#objects)
    * [AggregatedAnswerModel](#aggregatedanswermodel)
    * [AnswerChoiceModel](#answerchoicemodel)
    * [AnswerDetailModel](#answerdetailmodel)
    * [AnswerResultModel](#answerresultmodel)
    * [LoginResponse](#loginresponse)
    * [QuestionModel](#questionmodel)
    * [RespondentModel](#respondentmodel)
    * [UserModel](#usermodel)
  * [Inputs](#inputs)
    * [CreateAnswerChoiceInput](#createanswerchoiceinput)
    * [CreateAnswerDetailInput](#createanswerdetailinput)
    * [CreateAnswerResultInput](#createanswerresultinput)
    * [CreateQuestionInput](#createquestioninput)
    * [CreateRespondentInput](#createrespondentinput)
    * [CreateUserInput](#createuserinput)
    * [GetUserArgs](#getuserargs)
    * [LoginInput](#logininput)
  * [Scalars](#scalars)
    * [Boolean](#boolean)
    * [DateTime](#datetime)
    * [Int](#int)
    * [String](#string)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>getAllQuestions</strong></td>
<td valign="top">[<a href="#questionmodel">QuestionModel</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getQuestionsByUser</strong></td>
<td valign="top">[<a href="#questionmodel">QuestionModel</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userId</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getQuestionById</strong></td>
<td valign="top"><a href="#questionmodel">QuestionModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>findOneByEmail</strong></td>
<td valign="top"><a href="#usermodel">UserModel</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">getUserArgs</td>
<td valign="top"><a href="#getuserargs">GetUserArgs</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>countAnswerRespondentsByQuestionId</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">questionId</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getDescriptionAnswersByQuestionId</strong></td>
<td valign="top">[<a href="#answerresultmodel">AnswerResultModel</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">questionId</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getAggregatedAnswerByQuestionId</strong></td>
<td valign="top">[<a href="#aggregatedanswermodel">AggregatedAnswerModel</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">questionId</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Mutation
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>createQuestionWithAnswerChoices</strong></td>
<td valign="top"><a href="#questionmodel">QuestionModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createQuestionInput</td>
<td valign="top"><a href="#createquestioninput">CreateQuestionInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createAnswerChoicesInput</td>
<td valign="top">[<a href="#createanswerchoiceinput">CreateAnswerChoiceInput</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteQuestion</strong></td>
<td valign="top"><a href="#questionmodel">QuestionModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>login</strong></td>
<td valign="top"><a href="#loginresponse">LoginResponse</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">loginInput</td>
<td valign="top"><a href="#logininput">LoginInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createUser</strong></td>
<td valign="top"><a href="#usermodel">UserModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createUserInput</td>
<td valign="top"><a href="#createuserinput">CreateUserInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createAnswerWithRespondent</strong></td>
<td valign="top"><a href="#answerresultmodel">AnswerResultModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createAnswerResultInput</td>
<td valign="top"><a href="#createanswerresultinput">CreateAnswerResultInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createAnswerDetailsInput</td>
<td valign="top">[<a href="#createanswerdetailinput">CreateAnswerDetailInput</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createRespondentInput</td>
<td valign="top"><a href="#createrespondentinput">CreateRespondentInput</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### AggregatedAnswerModel

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>questionId</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>question</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>choiceId</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>choice</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>count</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### AnswerChoiceModel

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answerChoice</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>question</strong></td>
<td valign="top"><a href="#questionmodel">QuestionModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answerDetails</strong></td>
<td valign="top">[<a href="#answerdetailmodel">AnswerDetailModel</a>!]!</td>
<td></td>
</tr>
</tbody>
</table>

### AnswerDetailModel

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answerResult</strong></td>
<td valign="top"><a href="#answerresultmodel">AnswerResultModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answerChoice</strong></td>
<td valign="top"><a href="#answerchoicemodel">AnswerChoiceModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### AnswerResultModel

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>question</strong></td>
<td valign="top"><a href="#questionmodel">QuestionModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answerDetails</strong></td>
<td valign="top">[<a href="#answerdetailmodel">AnswerDetailModel</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>respondent</strong></td>
<td valign="top"><a href="#respondentmodel">RespondentModel</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### LoginResponse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>accessToken</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#usermodel">UserModel</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### QuestionModel

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>question</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answerFormat</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answerChoices</strong></td>
<td valign="top">[<a href="#answerchoicemodel">AnswerChoiceModel</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answerResults</strong></td>
<td valign="top">[<a href="#answerresultmodel">AnswerResultModel</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#usermodel">UserModel</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### RespondentModel

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answers</strong></td>
<td valign="top">[<a href="#answerresultmodel">AnswerResultModel</a>!]!</td>
<td></td>
</tr>
</tbody>
</table>

### UserModel

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>questions</strong></td>
<td valign="top">[<a href="#questionmodel">QuestionModel</a>!]</td>
<td></td>
</tr>
</tbody>
</table>

## Inputs

### CreateAnswerChoiceInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>answerChoice</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateAnswerDetailInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>answerChoiceId</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateAnswerResultInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>questionId</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### CreateQuestionInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>question</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>answerFormat</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userId</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateRespondentInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateUserInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### GetUserArgs

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### LoginInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### DateTime

A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

