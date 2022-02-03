near call xtest1.testnet init_new_form '{"title": "test_dep", "description":"formtest", "type": 0}' --account-id xtest1.testnet --gas=300000000000000
near view xtest1.testnet get_user '{"userId": "xtest1.testnet"}' --account-id xtest1.testnet
near view xtest1.testnet get_form '{"id": "cnPNVXsrQbdiCtvpZZrRvimgNzeJXK7tbZyJ2xUsYLpUN"}' --account-id xtest3.testnet
near view xtest1.testnet get_forms_count '{}' --account-id xtest1.testnet
near view xtest1.testnet get_participants_count '{}' --account-id xtest1.testnet
near call xtest1.testnet new_element '{"formId": "cnPNVXsrQbdiCtvpZZrRvimgNzefr2uYi4imJUUaFKoYe", "type": 2, "title": ["q_test2222332254_ggg33_vvbbv"], "meta": ["123123", "3123123"], "isRequired": false, "numth": 0}' --account-id xtest1.testnet --gas=300000000000000
near view xtest1.testnet get_element '{"formId": "cnPNVXssboBwGRcdzKSNtD6t68DGwU2uRqrL19AtHaN5K", "userId": "xtest1.testnet"}' --account-id xtest1.testnet
near call xtest1.testnet publish_form '{"formId": "cnPNVXsrQbdiCtvpZZrRvimgNzefr2uYi4imJUUaFKoYe", "limit_participants": 200, "enroll_fee": "1000000000000000000000000", "start_date": "1612112400000", "end_date": "1675184400000", "black_list": [], "white_list": []}' --account-id xtest1.testnet
near call xtest1.testnet unpublish_form '{"formId": "cnPNVXsrQbdiCtvpZZrRvimgNzefr2uYi4imJUUaFKoYe"}' --account-id xtest1.testnet
near view xtest1.testnet get_element_count '{"formId": "WqjNngckQsLxBDFejuZp4RqZMaWq14VETthR5ovfB6m3f"}' --account-id xtest1.testnet

near call xtest1.testnet join_form '{"formId": "cnPNVXsrQbdiCtvpZZrRvimgNzefr2uYi4imJUUaFKoYe"}' --account-id xtest3.testnet --deposit 1
near call xtest1.testnet submit_answer '{"formId": "cnPNVXssboBwGRcdzKSNtD6t6EfXSQmonVhfL38rhtCHu", "elementId": "8ArNoKHTUmLJCz7j6mhZqcSmkAE7WXALtnQPLtkLJUa29SPhX9PdrK2ssutouTELD3adyWg859gpgx9uwEUTS", "answer": ["123123"]}' --account-id xtest1.testnet --gas=300000000000000
near call xtest1.testnet get_answer_statistical '{"formId": "cnPNVXsrQbdiCtvpZZrRvimgNt7GVbm2kX3HPgsY2E42N", "userId": "anhhd.testnet", "page": 2}' --account-id xtest1.testnet --gas=300000000000000
near view xtest1.testnet get_passed_element_count '{"formId": "cnPNVXsrQbdiCtvpZZrRvimgNt7GVbm2kX3HPgsY2E42N", "userId": "gefi_hub.testnet", "page": 2}' --account-id xtest1.testnet

near view xtest1.testnet get_forms '{"userId": "gefi_hub.testnet", "page": 1}' --account-id xtest1.testnet
near view xtest1.testnet get_joined_forms '{"userId": "xtest1.testnet", "page": 1}' --account-id xtest1.testnet
near view xtest1.testnet test '{"title": ["123", "123123", "345345"]}' --account-id xtest1.testnet
near view xtest1.testnet get_elements '{"formId": "WqjNngckQsLxBDFejuZp4RqZMaWq14VETthR5ovfB6m3f", "userId": "xtest1.testnet", "page": 2}' --account-id xtest1.testnet

near view xtest1.testnet get_participant_form_status '{"formId": "cnPNVXssboBwGRcdzKSNtD6t68DGwU2uRqrL19AtHaN5K", "userId": "xtest1.testnet"}' --account-id xtest1.testnet

near call xtest1.testnet get_element '{"formId": "cnPNVXssboBwGRcdzKSNtD6t68DGwU2uRqrL19AtHaN5K", "index": 1}' --account-id xtest1.testnet --gas=300000000000000

near view mtoan2111.testnet get_form_count '{"userId": "mtoan2111.testnet"}' --account-id mtoan2111.testnet

near call mtoan2111.testnet submit_answer '{"formId": "qCsqqzSCyFzHgKCED2yfi7NDBDA5gJBxZeqzpXWbSZWx8RsQb", "elementId": "FpT3nqdVbtLzUgDivzP36FLrimTFT8xpLKmLFcnEnmaPPMS7jqsd2CMTZxWnHKd7kLqUYL9adE4zpoynW5QphCrtjJgbW", "answer": "yes"}' --account-id mtoan2111.testnet --gas=300000000000000
near view mtoan2111.testnet get_element '{"formId": "qCsqqzSCyFzHgKCED2yfi7NDBDA5gJBxZeqzpXWbSZWx8RsQb", "userId": "mtoan2111.testnet"}' --account-id mtoan2111.testnet
near call mtoan2111.testnet get_answer_statistical '{"formId": "cnPNVXsuPbXGrieN8SpJKSb9yMD7LqKLwBPvBeVqpHL82", "userId": "xtest6.testnet", "page": 1}' --account-id mtoan2111.testnet --gas=300000000000000
near view mtoan2111.testnet get_participants '{"formId": "qCsqqzSCyFzHgKCED2yfi7NDBDA5oKTYsPrSLAAsLpUZZzcEt", "page": 1}' --account-id mtoan2111.testnet
near view mtoan2111.testnet get_elements '{"formId": "qCsqqzSCyFzHgKCED2yfi7NDBDA5gJBxZeqzpXWbSZWx8RsQb", "userId": "mtoan2111.testnet", "page": 1}' --account-id mtoan2111.testnet
near call mtoan2111.testnet delete_element '{"id":"FpT3nqdVbtLzUgDivzP36FLrimTFT8xpLKmLFcnEnmaPPMS7jqsd2CMTZxWnHKd7kLqUYL9adE4zpoynW5QphCrtjJgbW"}' --account-id mtoan2111.testnet --gas=300000000000000

near call neutrino.testnet init_new_form '{\"title\": \"test_dep\", \"description\":\"formtest\", \"type\": 0}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_form '{\"id\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\"}' --account-id neutrino.testnet 
near call neutrino.testnet unpublish_form '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\"}' --account-id neutrino.testnet --gas=300000000000000

near call neutrino.testnet publish_form '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\", \"limit_participants\": 200, \"enroll_fee\": \"1000000000000000000000000\", \"start_date\": \"1643461271000\", \"end_date\": \"1643461274277\", \"black_list\": [], \"white_list\": []}' --account-id neutrino.testnet --gas=300000000000000

near call neutrino.testnet new_element '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\", \"type\": 1, \"title\": \"q_test2222333\", \"meta\": \"123123; 3123123\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_element '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\", \"index\": 1}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet join_form '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\"}' --account-id neutrino.testnet --deposit 1 --gas=300000000000000
near call neutrino.testnet get_participant_detail '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\", \"userId\":\"neutrino.testnet\"}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_participants_detail '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\", \"page\":0}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet update_participant_status '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\", \"userId\":\"neutrino.testnet\", \"status\":0}' --account-id neutrino.testnet --gas=300000000000000
near call neutrino.testnet get_enroll_fee '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\"}' --account-id neutrino.testnet
near call neutrino.testnet set_enroll_fee '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\", \"new_fee\": \"1000000000000000000000000\"}' --account-id neutrino.testnet
near view neutrino.testnet get_participants '{"formId": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\", \"page\": 1}' --account-id neutrino.testnet
near call neutrino.testnet claim_reward '{\"formId\": \"C1tbALg81eAv864kXLhRtnboYtGncBDiamyX8daNYnyW6Pk4\"}' --account-id neutrino.testnet


# event

near call xtest1.testnet init_new_event '{"name": "test_dep", "description":["formtest"], "location": "Hanoi", "privacy": [""], "cover_image": "", "type": 0}' --account-id xtest1.testnet --gas=300000000000000 --deposit 1
near view xtest1.testnet get_event '{"eventId": "GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLoC2WBSenwrB3ksDBc95Nq"}' --account-id xtest1.testnet
near call xtest1.testnet publish_event '{"eventId": "GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLoC2WBSenwrB3ksDBc95Nq", "limit_participants": 200, "enroll_fee": "1000000000000000000000000", "start_date": "1612112400000", "end_date": "1675184400000", "black_list": [], "white_list": []}' --account-id xtest1.testnet
near call xtest1.testnet join_event '{"eventId": "GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLoC2WBSenwrB3ksDBc95Nq"}' --account-id xtest3.testnet --deposit 1
near view xtest1.testnet get_user '{"userId": "xtest3.testnet"}' --account-id xtest1.testnet
near call xtest1.testnet unpublish_event '{"eventId": "GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLoC2WBSenwrB3ksDBc95Nq"}' --account-id xtest1.testnet



# export function init_new_event(
#     title: string,
#     location: string,
#     description: Set<string>,
#     privacy: Set<string>,
#     cover_image: string,
#     type: EVENT_TYPE,
#     start_date: u64,
#     end_date: u64,
# ): string | null {

near call neutrino.testnet init_new_event '{\"title\": \"test_dep\", \"location\": \"Hanoi\", \"description\":[\"formtest\"], \"privacy\": [\"\"], \"cover_image\": \"\", \"type\": 0, \"start_date\": \"1612112400000\", \"end_date\": \"1675184400000\"}' --account-id neutrino.testnet --gas=300000000000000 --deposit 1
near view neutrino.testnet get_event '{\"eventId\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLoC2WBSenwrB3ksDBc95Nq\"}' --account-id neutrino.testnet
near call neutrino.testnet publish_event '{\"eventId\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLoC2WBSenwrB3ksDBc95Nq\", \"limit_participants\": 200, \"enroll_fee\": \"1000000000000000000000000\", \"start_date\": \"1612112400000\", \"end_date\": \"1675184400000\", \"black_list\": [], \"white_list\": []}' --account-id neutrino.testnet
near call neutrino.testnet join_event '{\"eventId\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLoC2WBSenwrB3ksDBc95Nq\"}' --account-id neutrino.testnet --deposit 1
near call neutrino.testnet get_user '{\"userId\": \"gefi_hub.testnet\"}' --account-id neutrino.testnet
near call neutrino.testnet unpublish_event '{\"eventId\": \"GEZdGLxjz9z8ChsACivsTbYsEd6vyANQkkLoC2WBSenwrB3ksDBc95Nq\"}' --account-id neutrino.testnet

near call neutrino.testnet get_owned_events '{\"userId\": \"neutrino.testnet\", \"page\": 1}' --account-id neutrino.testnet
near call neutrino.testnet get_particippated_events '{\"userId\": \"neutrino.testnet\", \"page\": 1}' --account-id neutrino.testnet
