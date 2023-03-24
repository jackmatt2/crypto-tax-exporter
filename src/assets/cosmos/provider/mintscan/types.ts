export type CosmosTransaction =
  | {
      header: {
        id: number;
        chain_id: string;
        block_id: number;
        timestamp: string;
      };
      data: {
        height: string;
        txhash: string;
        codespace: string;
        code: number;
        data: string;
        raw_log: string;
        logs: {
          msg_index: number;
          log: string;
          events: {
            type: string;
            attributes: { key: string; value: string }[];
          }[];
        }[];
        info: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
          "@type": string;
          body: {
            messages: {
              "@type": string;
              from_address: string;
              to_address: string;
              amount: { denom: string; amount: string }[];
            }[];
            memo: string;
            timeout_height: string;
            extension_options: never[];
            non_critical_extension_options: never[];
          };
          auth_info: {
            signer_infos: {
              public_key: { "@type": string; key: string };
              mode_info: { single: { mode: string } };
              sequence: string;
            }[];
            fee: {
              amount: { denom: string; amount: string }[];
              gas_limit: string;
              payer: string;
              granter: string;
            };
          };
          signatures: string[];
        };
        timestamp: string;
        events: {
          type: string;
          attributes: { key: string; value: string; index: boolean }[];
        }[];
      };
    }
  | {
      header: {
        id: number;
        chain_id: string;
        block_id: number;
        timestamp: string;
      };
      data: {
        height: string;
        txhash: string;
        codespace: string;
        code: number;
        data: string;
        raw_log: string;
        logs: {
          msg_index: number;
          log: string;
          events: {
            type: string;
            attributes: { key: string; value: string }[];
          }[];
        }[];
        info: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
          "@type": string;
          body: {
            messages: {
              "@type": string;
              delegator_address: string;
              validator_address: string;
              amount: { denom: string; amount: string };
            }[];
            memo: string;
            timeout_height: string;
            extension_options: never[];
            non_critical_extension_options: never[];
          };
          auth_info: {
            signer_infos: {
              public_key: { "@type": string; key: string };
              mode_info: { single: { mode: string } };
              sequence: string;
            }[];
            fee: {
              amount: { denom: string; amount: string }[];
              gas_limit: string;
              payer: string;
              granter: string;
            };
          };
          signatures: string[];
        };
        timestamp: string;
        events: {
          type: string;
          attributes: { key: string; value: string; index: boolean }[];
        }[];
      };
    }
  | {
      header: {
        id: number;
        chain_id: string;
        block_id: number;
        timestamp: string;
      };
      data: {
        height: string;
        txhash: string;
        codespace: string;
        code: number;
        data: string;
        raw_log: string;
        logs: {
          msg_index: number;
          log: string;
          events: {
            type: string;
            attributes: { key: string; value: string }[];
          }[];
        }[];
        info: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
          "@type": string;
          body: {
            messages: {
              "@type": string;
              source_port: string;
              source_channel: string;
              token: { denom: string; amount: string };
              sender: string;
              receiver: string;
              timeout_height: {
                revision_number: string;
                revision_height: string;
              };
              timeout_timestamp: string;
            }[];
            memo: string;
            timeout_height: string;
            extension_options: never[];
            non_critical_extension_options: never[];
          };
          auth_info: {
            signer_infos: {
              public_key: { "@type": string; key: string };
              mode_info: { single: { mode: string } };
              sequence: string;
            }[];
            fee: {
              amount: { denom: string; amount: string }[];
              gas_limit: string;
              payer: string;
              granter: string;
            };
          };
          signatures: string[];
        };
        timestamp: string;
        events: {
          type: string;
          attributes: { key: string; value: string; index: boolean }[];
        }[];
      };
    }
  | {
      header: {
        id: number;
        chain_id: string;
        block_id: number;
        timestamp: string;
      };
      data: {
        height: string;
        txhash: string;
        codespace: string;
        code: number;
        data: string;
        raw_log: string;
        logs: {
          msg_index: number;
          log: string;
          events: {
            type: string;
            attributes: { key: string; value: string }[];
          }[];
        }[];
        info: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
          "@type": string;
          body: {
            messages: {
              "@type": string;
              delegator_address: string;
              validator_address: string;
            }[];
            memo: string;
            timeout_height: string;
            extension_options: never[];
            non_critical_extension_options: never[];
          };
          auth_info: {
            signer_infos: {
              public_key: { "@type": string; key: string };
              mode_info: { single: { mode: string } };
              sequence: string;
            }[];
            fee: {
              amount: { denom: string; amount: string }[];
              gas_limit: string;
              payer: string;
              granter: string;
            };
          };
          signatures: string[];
        };
        timestamp: string;
        events: {
          type: string;
          attributes: { key: string; value: string; index: boolean }[];
        }[];
      };
    }
  | {
      header: {
        id: number;
        chain_id: string;
        block_id: number;
        timestamp: string;
      };
      data: {
        height: string;
        txhash: string;
        codespace: string;
        code: number;
        data: string;
        raw_log: string;
        logs: {
          msg_index: number;
          log: string;
          events: {
            type: string;
            attributes: { key: string; value: string }[];
          }[];
        }[];
        info: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
          "@type": string;
          body: {
            messages: {
              "@type": string;
              delegator_address: string;
              validator_src_address: string;
              validator_dst_address: string;
              amount: { denom: string; amount: string };
            }[];
            memo: string;
            timeout_height: string;
            extension_options: never[];
            non_critical_extension_options: never[];
          };
          auth_info: {
            signer_infos: {
              public_key: { "@type": string; key: string };
              mode_info: { single: { mode: string } };
              sequence: string;
            }[];
            fee: {
              amount: { denom: string; amount: string }[];
              gas_limit: string;
              payer: string;
              granter: string;
            };
          };
          signatures: string[];
        };
        timestamp: string;
        events: {
          type: string;
          attributes: { key: string; value: string; index: boolean }[];
        }[];
      };
    }
  | {
      header: {
        id: number;
        chain_id: string;
        block_id: number;
        timestamp: string;
      };
      data: {
        height: string;
        txhash: string;
        codespace: string;
        code: number;
        data: string;
        raw_log: string;
        logs: {
          msg_index: number;
          log: string;
          events: {
            type: string;
            attributes: { key: string; value: string }[];
          }[];
        }[];
        info: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
          "@type": string;
          body: {
            messages: (
              | {
                  "@type": string;
                  client_id: string;
                  header: {
                    "@type": string;
                    signed_header: {
                      header: {
                        version: { block: string; app: string };
                        chain_id: string;
                        height: string;
                        time: string;
                        last_block_id: {
                          hash: string;
                          part_set_header: { total: number; hash: string };
                        };
                        last_commit_hash: string;
                        data_hash: string;
                        validators_hash: string;
                        next_validators_hash: string;
                        consensus_hash: string;
                        app_hash: string;
                        last_results_hash: string;
                        evidence_hash: string;
                        proposer_address: string;
                      };
                      commit: {
                        height: string;
                        round: number;
                        block_id: {
                          hash: string;
                          part_set_header: { total: number; hash: string };
                        };
                        signatures: (
                          | {
                              block_id_flag: string;
                              validator_address: string;
                              timestamp: string;
                              signature: string;
                            }
                          | {
                              block_id_flag: string;
                              validator_address: null;
                              timestamp: string;
                              signature: null;
                            }
                        )[];
                      };
                    };
                    validator_set: {
                      validators: {
                        address: string;
                        pub_key: { ed25519: string };
                        voting_power: string;
                        proposer_priority: string;
                      }[];
                      proposer: {
                        address: string;
                        pub_key: { ed25519: string };
                        voting_power: string;
                        proposer_priority: string;
                      };
                      total_voting_power: string;
                    };
                    trusted_height: {
                      revision_number: string;
                      revision_height: string;
                    };
                    trusted_validators: {
                      validators: {
                        address: string;
                        pub_key: { ed25519: string };
                        voting_power: string;
                        proposer_priority: string;
                      }[];
                      proposer: {
                        address: string;
                        pub_key: { ed25519: string };
                        voting_power: string;
                        proposer_priority: string;
                      };
                      total_voting_power: string;
                    };
                  };
                  signer: string;
                  packet?: undefined;
                  proof_commitment?: undefined;
                  proof_height?: undefined;
                }
              | {
                  "@type": string;
                  packet: {
                    sequence: string;
                    source_port: string;
                    source_channel: string;
                    destination_port: string;
                    destination_channel: string;
                    data: string;
                    timeout_height: {
                      revision_number: string;
                      revision_height: string;
                    };
                    timeout_timestamp: string;
                  };
                  proof_commitment: string;
                  proof_height: {
                    revision_number: string;
                    revision_height: string;
                  };
                  signer: string;
                  client_id?: undefined;
                  header?: undefined;
                }
            )[];
            memo: string;
            timeout_height: string;
            extension_options: never[];
            non_critical_extension_options: never[];
          };
          auth_info: {
            signer_infos: {
              public_key: { "@type": string; key: string };
              mode_info: { single: { mode: string } };
              sequence: string;
            }[];
            fee: {
              amount: { denom: string; amount: string }[];
              gas_limit: string;
              payer: string;
              granter: string;
            };
          };
          signatures: string[];
        };
        timestamp: string;
        events: {
          type: string;
          attributes: { key: string; value: string; index: boolean }[];
        }[];
      };
    }
  | {
      header: {
        id: number;
        chain_id: string;
        block_id: number;
        timestamp: string;
      };
      data: {
        height: string;
        txhash: string;
        codespace: string;
        code: number;
        data: string;
        raw_log: string;
        logs: {
          msg_index: number;
          log: string;
          events: {
            type: string;
            attributes: { key: string; value: string }[];
          }[];
        }[];
        info: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
          "@type": string;
          body: {
            messages: {
              "@type": string;
              delegator_address: string;
              validator_address: string;
              amount: { denom: string; amount: string };
            }[];
            memo: string;
            timeout_height: string;
            extension_options: never[];
            non_critical_extension_options: never[];
          };
          auth_info: {
            signer_infos: {
              public_key: { "@type": string; key: string };
              mode_info: { single: { mode: string } };
              sequence: string;
            }[];
            fee: {
              amount: { denom: string; amount: string }[];
              gas_limit: string;
              payer: string;
              granter: string;
            };
          };
          signatures: string[];
        };
        timestamp: string;
        events?: undefined;
      };
    }
  | {
      header: {
        id: number;
        chain_id: string;
        block_id: number;
        timestamp: string;
      };
      data: {
        height: string;
        txhash: string;
        codespace: string;
        code: number;
        data: string;
        raw_log: string;
        logs: {
          msg_index: number;
          log: string;
          events: {
            type: string;
            attributes: { key: string; value: string }[];
          }[];
        }[];
        info: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
          "@type": string;
          body: {
            messages: {
              "@type": string;
              delegator_address: string;
              validator_address: string;
            }[];
            memo: string;
            timeout_height: string;
            extension_options: never[];
            non_critical_extension_options: never[];
          };
          auth_info: {
            signer_infos: {
              public_key: { "@type": string; key: string };
              mode_info: { single: { mode: string } };
              sequence: string;
            }[];
            fee: {
              amount: { denom: string; amount: string }[];
              gas_limit: string;
              payer: string;
              granter: string;
            };
          };
          signatures: string[];
        };
        timestamp: string;
        events?: undefined;
      };
    }
  | {
      header: {
        id: number;
        chain_id: string;
        block_id: number;
        timestamp: string;
      };
      data: {
        height: string;
        txhash: string;
        codespace: string;
        code: number;
        data: string;
        raw_log: string;
        logs: {
          msg_index: number;
          log: string;
          events: {
            type: string;
            attributes: { key: string; value: string }[];
          }[];
        }[];
        info: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
          "@type": string;
          body: {
            messages: {
              "@type": string;
              from_address: string;
              to_address: string;
              amount: { denom: string; amount: string }[];
            }[];
            memo: string;
            timeout_height: string;
            extension_options: never[];
            non_critical_extension_options: never[];
          };
          auth_info: {
            signer_infos: {
              public_key: { "@type": string; key: string };
              mode_info: { single: { mode: string } };
              sequence: string;
            }[];
            fee: {
              amount: { denom: string; amount: string }[];
              gas_limit: string;
              payer: string;
              granter: string;
            };
          };
          signatures: string[];
        };
        timestamp: string;
        events?: undefined;
      };
    };
