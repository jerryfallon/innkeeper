<?php

	class Api extends stdClass {
		private $db;

		function __construct() {
			include 'Db.php';
			$this->db = new Db();
		}

		/* Generic SQL Functions */
		private function insert($table, $data) {
			$sql = 'INSERT INTO ' . mysql_real_escape_string($table);
			$count = 0;
			$cols = '';
			$vals = '';
			foreach($data as $value) {
				$cols .= ($count ? ', ' : '') . mysql_real_escape_string($value->column);
				$vals .= ($count ? ', ' : '') . '"' . mysql_real_escape_string($value->value) . '"';
				$count++;
			}
			$sql .= '('.$cols.') VALUES ('.$vals.')';
			return $this->db->executeSql($sql, 'insert');
		}

		private function selectDistinct($select, $from, $where, $group, $order, $limit) {
			$sql = 'SELECT DISTINCT ' . ($select ? $select : '*');
			$sql .= ' FROM ' . $from;
			if(!empty($where)) {
				$sql .= ' WHERE ' . $where;
			}
			if(!empty($group)) {
				$sql .= ' GROUP BY ' . $group;
			}
			if(!empty($order)) {
				$sql .= ' ORDER BY ' . $order;
			}
			if(!empty($limit)) {
				$sql .= ' LIMIT ' . $limit;
			}
			return $this->db->executeSql($sql, 'select');
		}

		private function update($from, $where, $set) {
			$sql = 'UPDATE ' . $from;
			$sql .= ' SET ' . $set;
			$sql .= ' WHERE ' . $where;
			// echo($sql);
			return $this->db->executeSql($sql, 'update');
		}

		private function delete($from, $where) {
			$sql = 'DELETE FROM ' . $from;
			$sql .= ' WHERE ' . $where;
			return $this->db->executeSql($sql, 'delete');
		}




		/* API Commands */
		public function addData($table, $data) {
			if(json_decode($data)) {
				return $this->insert($table, json_decode($data));
			}
		}

		public function getData($table) {
			$from = $table;
			return $this->selectDistinct(null, $from, null, null, null, null);
		}
	}

	$data = $_POST;
	$api = new Api();
	switch($data['command']) {
		case 'addData':
			$response = $api->addData($data['table'], $data['data']);
			break;
		case 'getData':
			$response = $api->getData($data['table']);
			break;
		default:
			$response = 'Unrecognized command: ' . $data['command'];
			break;
	}

	die(json_encode($response));

?>