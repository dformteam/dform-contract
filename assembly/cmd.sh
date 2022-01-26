near call xtest3.testnet init_new_form '{"title": "test_dep", "description":"formtest", "type": 0}' --account-id xtest3.testnet --gas=300000000000000
near view xtest3.testnet get_form '{"id": "cnPNVXssboBwGRcdzKSNtD6t6EfXSQmonVhfL38rhtCHu"}' --account-id xtest3.testnet
near call xtest3.testnet new_element '{"formId": "cnPNVXssboBwGRcdzKSNtD6t6EfXSQmonVhfL38rhtCHu", "type": 2, "title": ["q_test2222332254_ggg33_vvbbv"], "meta": ["123123", "3123123"], "isRequired": false}' --account-id xtest3.testnet --gas=300000000000000
near view xtest3.testnet get_element '{"formId": "cnPNVXssboBwGRcdzKSNtD6t68DGwU2uRqrL19AtHaN5K", "userId": "xtest3.testnet"}' --account-id xtest3.testnet
near call xtest3.testnet publish_form '{"formId": "cnPNVXssboBwGRcdzKSNtD6t6EfXSQmonVhfL38rhtCHu", "limit_participants": 200, "enroll_fee": "0", "start_date": "1612112400000", "end_date": "1675184400000", "black_list": [], "white_list": []}' --account-id xtest3.testnet
near call xtest3.testnet unpublish_form '{"formId": "cnPNVXssboBwGRcdzKSNtD6t68DGwU2uRqrL19AtHaN5K"}' --account-id xtest3.testnet
near view xtest3.testnet get_element_count '{"formId": "cnPNVXssboBwGRcdzKSNtD6t6EfXSQmonVhfL38rhtCHu"}' --account-id xtest3.testnet

near call xtest3.testnet join_form '{"formId": "cnPNVXssboBwGRcdzKSNtD6t6EfXSQmonVhfL38rhtCHu"}' --account-id xtest3.testnet
near call xtest3.testnet submit_answer '{"formId": "cnPNVXssboBwGRcdzKSNtD6t6EfXSQmonVhfL38rhtCHu", "elementId": "8ArNoKHTUmLJCz7j6mhZqcSmkAE7WXALtnQPLtkLJUa29SPhX9PdrK2ssutouTELD3adyWg859gpgx9uwEUTS", "answer": ["123123"]}' --account-id xtest3.testnet --gas=300000000000000
near call xtest3.testnet get_answer_statistical '{"formId": "cnPNVXssboBwGRcdzKSNtD6t6EfXSQmonVhfL38rhtCHu", "userId": "xtest3.testnet", "page": 1}' --account-id xtest3.testnet --gas=300000000000000

near view xtest3.testnet get_forms '{"userId": "gefi_hub.testnet", "page": 1}' --account-id xtest3.testnet
near view xtest3.testnet get_joined_forms '{"userId": "xtest3.testnet", "page": 1}' --account-id xtest3.testnet
near view xtest3.testnet test '{"title": ["123", "123123", "345345"]}' --account-id xtest3.testnet
near view xtest3.testnet get_elements '{"formId": "qCsqqzSCyGMNbXh3aLep8NJRntYn5i3XUfWEMi6JCGr9a1DSA", "userId": "mtoan2193.testnet", "page": 1}' --account-id xtest3.testnet


near call xtest3.testnet get_element '{"formId": "cnPNVXssboBwGRcdzKSNtD6t68DGwU2uRqrL19AtHaN5K", "index": 1}' --account-id xtest3.testnet --gas=300000000000000

near view mtoan2111.testnet get_form_count '{"userId": "mtoan2111.testnet"}' --account-id mtoan2111.testnet

near call mtoan2111.testnet submit_answer '{"formId": "qCsqqzSCyFzHgKCED2yfi7NDBDA5gJBxZeqzpXWbSZWx8RsQb", "elementId": "FpT3nqdVbtLzUgDivzP36FLrimTFT8xpLKmLFcnEnmaPPMS7jqsd2CMTZxWnHKd7kLqUYL9adE4zpoynW5QphCrtjJgbW", "answer": "yes"}' --account-id mtoan2111.testnet --gas=300000000000000
near view mtoan2111.testnet get_element '{"formId": "qCsqqzSCyFzHgKCED2yfi7NDBDA5gJBxZeqzpXWbSZWx8RsQb", "userId": "mtoan2111.testnet"}' --account-id mtoan2111.testnet
near call mtoan2111.testnet get_answer_statistical '{"formId": "cnPNVXsuPbXGrieN8SpJKSb9yMD7LqKLwBPvBeVqpHL82", "userId": "xtest6.testnet", "page": 1}' --account-id mtoan2111.testnet --gas=300000000000000
near view mtoan2111.testnet get_participants '{"formId": "qCsqqzSCyFzHgKCED2yfi7NDBDA5oKTYsPrSLAAsLpUZZzcEt", "page": 1}' --account-id mtoan2111.testnet
near view mtoan2111.testnet get_elements '{"formId": "qCsqqzSCyFzHgKCED2yfi7NDBDA5gJBxZeqzpXWbSZWx8RsQb", "userId": "mtoan2111.testnet", "page": 1}' --account-id mtoan2111.testnet
near call mtoan2111.testnet delete_element '{"id":"FpT3nqdVbtLzUgDivzP36FLrimTFT8xpLKmLFcnEnmaPPMS7jqsd2CMTZxWnHKd7kLqUYL9adE4zpoynW5QphCrtjJgbW"}' --account-id mtoan2111.testnet --gas=300000000000000

near call neutrino.testnet init_new_form '{\"title\": \"test_dep\", \"description\":\"formtest\", \"type\": 0}' --account-id neutrino.testnet --gas=300000000000000 --deposit 1
near call neutrino.testnet get_form '{\"id\": \"C1tbALg81eAv864kXLhRtnboYtGnU3vbFVeE4YtaeZ43ZQGJ\"}' --account-id neutrino.testnet
near call neutrino.testnet new_element '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGfMudExgdApzwZ1y99nbJ7\", \"type\": 2, \"title\": \"q_test2222332254_ggg33_vvbbv\", \"meta\": \"123123; 3123123\", \"isRequired\": false}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_element '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGfJg8TnWyRM7Y6tLA44pJu\", \"userId\": \"neutrino.testnet\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet join_form '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGnU3vbFVeE4YtaeZ43ZQGJ\"}' --account-id neutrino.testnet --deposit 1 --gas=300000000000000
near call neutrino.testnet get_participant_detail '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGfJg8TnWyRM7Y6tLA44pJu\", \"userId\":\"neutrino.testnet\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_participants_detail '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGfJg8TnWyRM7Y6tLA44pJu\", \"page\":0}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet update_participant_status '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGfJg8TnWyRM7Y6tLA44pJu\", \"userId\":\"neutrino.testnet\", \"status\":0}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_enroll_fee '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGfJg8TnWyRM7Y6tLA44pJu\"}' --account-id neutrino.testnet
near call neutrino.testnet set_enroll_fee '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGfPX1E6FBiPh4vyk5AjyNv\", \"new_fee\": \"1000000000000000000000000\"}' --account-id neutrino.testnet
near view neutrino.testnet get_participants '{"formId": \"C1tbALg81eAv864kXLhRtnboYtGfJg8TnWyRM7Y6tLA44pJu\", \"page\": 1}' --account-id neutrino.testnet

near call neutrino.testnet init_new_event '{\"name\": \"tedfsdfsdfdsdfst_dep\", \"event_type\":0, \"available_type\":1, \"participant_fee\":\"100000000000000000000000\"}' --account-id neutrino.testnet --gas=300000000000000 --deposit 1
near call neutrino.testnet get_event '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_invitation_code '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_participant_fee '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet update_event_info '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\", \"title\": \"anhvaembeee_dep\", \"description\":\"formtest\", \"location\":\"Hanoi\" , \"cover_img\":\"sadw\" , \"start_date\":\"1612112400000\", \"end_date\":\"1675184400000\"}' --account-id neutrino.testnet --gas=300000000000000 --deposit 1
near call neutrino.testnet delete_event '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet set_participant_fee '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\", \"new_fee\": \"1000000000000000000000000\"}' --account-id neutrino.testnet
near call neutrino.testnet set_participant_fee '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\", \"new_fee\": \"1000000000000000000000000\"}' --account-id neutrino.testnet
near call neutrino.testnet join_event '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\", \"invitation_code\":\"9KKeNf6EBVmmMVQfxg7Vks677VfJf2e4WWd5zWGwGJ4QirW5WxX4\"}' --account-id neutrino.testnet --gas=300000000000000 --deposit 1.5
near call neutrino.testnet interest_event '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\", \"invitation_code\":\"9KKeNf6EBVmmMVQfxg7Vks677VfJf2e4WWd5zWGwGJ4QirW5WxX4\"}' --account-id neutrino.testnet --gas=300000000000000 --deposit 1.5

near call neutrino.testnet interest_event '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\", \"invitation_code\":\"9KKeNf6EBVmmMVQfxg7Vks677VfJf2e4WWd5zWGwGJ4QirW5WxX4\"}' --account-id neutrino.testnet --gas=300000000000000 --deposit 1.5
near call neutrino.testnet not_interest_event '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\"}' --account-id neutrino.testnet --gas=300000000000000 --deposit 1.5
near call neutrino.testnet exit_event '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\"}' --account-id neutrino.testnet --gas=300000000000000 --deposit 1.5
near call neutrino.testnet get_num_of_interests '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_num_of_participants '{\"event_id\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLo2FF9HcNeJGWXP6TeuoyU\"}' --account-id neutrino.testnet --gas=300000000000000
