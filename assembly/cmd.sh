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

near view xtest3.testnet get_forms '{"userId": "xtest3.testnet", "page": 1}' --account-id xtest3.testnet
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

near call neutrino.testnet init_new_form '{\"title\": \"test_dep\", \"description\":\"formtest\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_form '{\"id\": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\"}' --account-id neutrino.testnet
near call neutrino.testnet new_element '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\", \"type\": 1, \"title\": \"q_test2222333\", \"meta\": \"123123; 3123123\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_element '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\", \"index\": 1}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet join_form '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\"}' --account-id neutrino.testnet --deposit 1 --gas=300000000000000
near call neutrino.testnet get_participant_detail '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\", \"userId\":\"neutrino.testnet\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_participants_detail '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\", \"page\":0}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet update_participant_status '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\", \"userId\":\"neutrino.testnet\", \"status\":0}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_enroll_fee '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\"}' --account-id neutrino.testnet
near call neutrino.testnet set_enroll_fee '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\", \"new_fee\": \"1000000000000000000000000\"}' --account-id neutrino.testnet
near view neutrino.testnet get_participants '{"formId": \"C1tbALg81eAv864kXLhRtnboYtGYAvSxnAjyJhgEEVZx9NmS\", \"page\": 1}' --account-id neutrino.testnet

