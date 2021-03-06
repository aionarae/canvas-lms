/*
 * Copyright (C) 2017 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import axios from 'axios';
import constants from 'jsx/gradebook-history/constants';
import UserApi from 'jsx/gradebook-history/api/UserApi';

QUnit.module('UserApi', {
  setup () {
    this.courseId = 525600;
    this.courseIdStub = this.stub(constants, 'courseId').returns(this.courseId);
    this.getStub = this.stub(axios, 'get')
      .returns(Promise.resolve({
        response: {}
      }));
  }
});

test('getUsersByName for graders searches by teachers and TAs', function () {
  const searchTerm = 'Norval';
  const url = encodeURI(`/api/v1/courses/${this.courseId}/users`);
  const params = {
    params: {
      search_term: searchTerm,
      enrollment_type: ['teacher', 'ta']
    }
  };
  const promise = UserApi.getUsersByName('graders', searchTerm);

  return promise.then(() => {
    strictEqual(this.getStub.callCount, 1);
    strictEqual(this.getStub.firstCall.args[0], url);
    deepEqual(this.getStub.firstCall.args[1], params);
  });
});

test('getUsersByName for students searches by students', function () {
  const searchTerm = 'Norval';
  const url = encodeURI(`/api/v1/courses/${this.courseId}/users`);
  const params = {
    params: {
      search_term: searchTerm,
      enrollment_type: ['student', 'student_view']
    }
  };
  const promise = UserApi.getUsersByName('students', searchTerm);

  return promise.then(() => {
    strictEqual(this.getStub.callCount, 1);
    strictEqual(this.getStub.firstCall.args[0], url);
    deepEqual(this.getStub.firstCall.args[1], params);
  });
});

test('getUsersNextPage makes a request with given url', function () {
  const url = 'https://fake.url/users?page=2';
  const promise = UserApi.getUsersNextPage(url);

  return promise.then(() => {
    strictEqual(this.getStub.callCount, 1);
    strictEqual(this.getStub.firstCall.args[0], url);
  });
});
